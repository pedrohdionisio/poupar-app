import { getProductCategoryLabel } from '@data/modules/categorySpend/constants/productCategories';
import type { ICategorySpend } from '@data/modules/categorySpend/types/CategorySpend';
import type { ProductCategoryType } from '@data/modules/categorySpend/types/CategorySpendTypes';
import type { IMerchant } from '@data/modules/merchant/types/Merchant';
import type { IAccountProduct, IPricePoint } from '@data/modules/product/types/Product';
import type { IPurchase } from '@data/modules/purchase/types/Purchase';
import { DateFormat } from '@shared/utils/date';
import {
  CATEGORY_SLICE_LIMIT,
  MERCHANT_SPEND_LIMIT,
  PERIOD_CAPTIONS,
  PERIOD_CONFIGS,
  PRICE_TREND_MAX_LABELS,
  REMAINING_CATEGORY_ID
} from './constants';
import type {
  ICategorySlice,
  IDateRange,
  IMerchantSpend,
  IMonthRange,
  IPeriodConfig,
  IPriceTrend,
  ISpendPoint,
  TPeriodId
} from './interfaces';

interface IBucket {
  start: Date;
  end: Date;
  amount: number;
}

function startOfDay(date: Date): Date {
  const next = new Date(date);

  next.setHours(0, 0, 0, 0);

  return next;
}

function startOfUnit(date: Date, config: IPeriodConfig): Date {
  const next = startOfDay(date);

  if (config.granularity === 'month') {
    next.setDate(1);
  }

  return next;
}

function shift(date: Date, config: IPeriodConfig, amount: number): Date {
  const next = new Date(date);

  if (config.granularity === 'month') {
    next.setMonth(next.getMonth() + amount);
    return next;
  }

  next.setDate(next.getDate() + amount);

  return next;
}

/**
 * As fatias nascem no início da janela e avançam uma unidade cada. Como `from`
 * é o começo exato da fatia mais antiga, nenhuma delas cai fora do período —
 * era isso que fazia `6 meses` desenhar 7 pontos, um deles um mês parcial.
 */
function buildBuckets(from: Date, config: IPeriodConfig): IBucket[] {
  return Array.from({ length: config.bucketCount }, (_value, index) => {
    const start = shift(from, config, index);

    return { start, end: shift(start, config, 1), amount: 0 };
  });
}

/**
 * A janela é fechada em unidades inteiras, não no instante atual: as strings
 * resultantes só mudam quando o dia (ou o mês) vira, então a query key fica
 * estável entre renders sem depender de memoização.
 */
export function getPeriodRange(periodId: TPeriodId, reference: Date): IDateRange {
  const config = PERIOD_CONFIGS[periodId];

  const from = shift(startOfUnit(reference, config), config, -(config.bucketCount - 1));

  /** O `BETWEEN` da API é inclusivo nas duas pontas: paramos 1ms antes de amanhã. */
  const to = startOfDay(reference);
  to.setDate(to.getDate() + 1);
  to.setMilliseconds(-1);

  return { from: from.toISOString(), to: to.toISOString() };
}

/** A janela de igual tamanho imediatamente anterior, base da variação. */
export function getPreviousPeriodRange(periodId: TPeriodId, reference: Date): IDateRange {
  const config = PERIOD_CONFIGS[periodId];

  const currentFrom = new Date(getPeriodRange(periodId, reference).from);

  const from = shift(currentFrom, config, -config.bucketCount);

  /** Termina 1ms antes do período atual, para nenhuma compra contar nos dois. */
  const to = new Date(currentFrom.getTime() - 1);

  return { from: from.toISOString(), to: to.toISOString() };
}

function getDateLabel(date: Date, config: IPeriodConfig): string {
  if (config.labelKind === 'weekday') {
    return DateFormat.toWeekday(date);
  }

  if (config.labelKind === 'dayOfMonth') {
    return DateFormat.toDayOfMonth(date);
  }

  return DateFormat.toShortMonth(date);
}

export function buildSpendSeries(
  purchases: IPurchase[],
  periodId: TPeriodId,
  /** Início da janela em ISO — é o começo exato da fatia mais antiga. */
  from: string
): ISpendPoint[] {
  const config = PERIOD_CONFIGS[periodId];

  const buckets = buildBuckets(new Date(from), config);

  for (const purchase of purchases) {
    const purchasedAt = new Date(purchase.purchasedAt);

    const bucket = buckets.find(
      ({ start, end }) => purchasedAt >= start && purchasedAt < end
    );

    if (bucket) {
      bucket.amount += purchase.totalAmount;
    }
  }

  return buckets.map((bucket, index) => ({
    /** Rótulo vazio esconde o texto sem tirar o ponto do gráfico. */
    label: index % config.labelEvery === 0 ? getDateLabel(bucket.start, config) : '',
    amount: bucket.amount
  }));
}

export function getTotalAmount(purchases: IPurchase[]): number {
  return purchases.reduce((total, { totalAmount }) => total + totalAmount, 0);
}

/**
 * `null` quando não há base de comparação — período anterior sem compra. Zero
 * significaria "gastou o mesmo", que é outra afirmação.
 */
export function getTotalChange(
  totalAmount: number,
  previousTotal: number
): number | null {
  if (previousTotal <= 0) {
    return null;
  }

  return (totalAmount - previousTotal) / previousTotal;
}

/** `2026-08-31` -> `2026-08`, em horário local: o mês do usuário, não o do UTC. */
function toMonthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function fromMonthKey(month: string): Date {
  const [year, monthNumber] = month.split('-');

  return new Date(Number(year), Number(monthNumber) - 1, 1);
}

/**
 * A rota `/category-spends` agrega por mês, então a janela em dias é arredondada
 * para os meses inteiros que a cobrem — `7 dias` no fim de agosto pede agosto
 * todo. Quem conserta a legenda desse arredondamento é `getCategoryCaption`.
 */
export function getPeriodMonthRange(periodId: TPeriodId, reference: Date): IMonthRange {
  const config = PERIOD_CONFIGS[periodId];

  const from = shift(startOfUnit(reference, config), config, -(config.bucketCount - 1));

  return { from: toMonthKey(from), to: toMonthKey(reference) };
}

/** `em agosto` quando a janela cabe num mês; `de março a agosto` quando não. */
function getMonthRangeCaption(monthRange: IMonthRange): string {
  const from = DateFormat.toMonth(fromMonthKey(monthRange.from));

  if (monthRange.from === monthRange.to) {
    return `em ${from}`;
  }

  return `de ${from} a ${DateFormat.toMonth(fromMonthKey(monthRange.to))}`;
}

/**
 * Nos períodos em meses a janela pedida coincide com a do filtro, e o card
 * repete a legenda dos demais. Nos períodos em dias ela é maior — aí o card
 * precisa dizer o recorte que de fato tem, ou afirmaria um que não é o seu.
 */
export function getCategoryCaption(periodId: TPeriodId, monthRange: IMonthRange): string {
  if (PERIOD_CONFIGS[periodId].granularity === 'month') {
    return PERIOD_CAPTIONS[periodId];
  }

  return getMonthRangeCaption(monthRange);
}

/**
 * Soma as linhas mensais numa fatia por categoria e corta no tamanho da paleta:
 * as maiores ficam nomeadas, o resto vira "Demais categorias". Um donut com 24
 * fatias não responde "onde meu dinheiro foi" — responde "existem 24 fatias".
 */
export function buildCategorySlices(categorySpends: ICategorySpend[]): ICategorySlice[] {
  const totals = new Map<ProductCategoryType, number>();

  for (const { category, totalAmount } of categorySpends) {
    totals.set(category, (totals.get(category) ?? 0) + totalAmount);
  }

  const slices = [...totals.entries()]
    .map(([category, amount]) => ({
      id: category,
      name: getProductCategoryLabel(category),
      amount
    }))
    .sort((a, b) => b.amount - a.amount);

  if (slices.length <= CATEGORY_SLICE_LIMIT) {
    return slices;
  }

  const named = slices.slice(0, CATEGORY_SLICE_LIMIT - 1);
  const remaining = slices.slice(CATEGORY_SLICE_LIMIT - 1);

  return [
    ...named,
    {
      id: REMAINING_CATEGORY_ID,
      name: 'Demais categorias',
      amount: remaining.reduce((total, { amount }) => total + amount, 0)
    }
  ];
}

/**
 * O total do donut é a soma das próprias fatias, não o total das compras: os
 * dois divergem quando uma compra entrou sem itens categorizados, e aí os
 * percentuais da legenda não fechariam 100%.
 */
export function getCategoryTotal(categorySlices: ICategorySlice[]): number {
  return categorySlices.reduce((total, { amount }) => total + amount, 0);
}

export function buildMerchantSpends(
  purchases: IPurchase[],
  merchants: IMerchant[]
): IMerchantSpend[] {
  const totals = new Map<string, { name: string; amount: number }>();

  for (const { merchantId, merchantName, totalAmount } of purchases) {
    const current = totals.get(merchantId);

    totals.set(merchantId, {
      name: current?.name ?? merchantName,
      amount: (current?.amount ?? 0) + totalAmount
    });
  }

  return [...totals.entries()]
    .map(([id, { name, amount }]) => {
      /**
       * A compra guarda o nome do momento da importação. O da lista é o atual —
       * renomear o estabelecimento precisa refletir no gráfico.
       */
      const currentName = merchants.find((merchant) => merchant.id === id)?.name;

      return { id, name: currentName ?? name, amount };
    })
    .sort((a, b) => b.amount - a.amount)
    .slice(0, MERCHANT_SPEND_LIMIT);
}

/** O item mais comprado: é dele que a variação de preço interessa ao usuário. */
export function getMostPurchasedProduct(
  products: IAccountProduct[]
): IAccountProduct | undefined {
  return [...products].sort((a, b) => b.purchasesCount - a.purchasesCount).at(0);
}

/**
 * Um ponto por compra, não uma média por mês. Comprar o mesmo item duas vezes
 * na mesma semana já é uma comparação de preço — e era justamente essa, a mais
 * comum, que a média mensal apagava ao colapsar as duas num ponto só.
 *
 * O eixo é a sequência de compras, não o calendário: dois pontos vizinhos podem
 * estar a um dia ou a dois meses de distância. É o rótulo de data que diz qual.
 */
export function buildPriceTrend(
  product: IAccountProduct | undefined,
  pricePoints: IPricePoint[],
  periodId: TPeriodId,
  range: IDateRange
): IPriceTrend | null {
  if (!product) {
    return null;
  }

  const config = PERIOD_CONFIGS[periodId];

  const from = new Date(range.from);
  const to = new Date(range.to);

  /**
   * A rota `/price-points` não aceita intervalo: ela devolve o histórico
   * inteiro do produto, e o recorte do período é feito aqui.
   */
  const periodPoints = pricePoints
    .map((pricePoint) => ({ ...pricePoint, date: new Date(pricePoint.purchasedAt) }))
    .filter(({ date }) => date >= from && date <= to)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const labelEvery = Math.ceil(periodPoints.length / PRICE_TREND_MAX_LABELS);

  return {
    productName: product.name,
    points: periodPoints.map(({ date, unitPrice }, index) => ({
      /** Rótulo vazio esconde o texto sem tirar o ponto do gráfico. */
      label: index % labelEvery === 0 ? getDateLabel(date, config) : '',
      price: unitPrice
    }))
  };
}
