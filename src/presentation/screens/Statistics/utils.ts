import type { IMerchant } from '@data/modules/merchant/types/Merchant';
import type { IAccountProduct, IPricePoint } from '@data/modules/product/types/Product';
import type { IPurchase } from '@data/modules/purchase/types/Purchase';
import type { MerchantCategoryType } from '@data/modules/purchase/types/PurchaseTypes';
import { DateFormat } from '@shared/utils/date';
import { CATEGORY_LABELS, MERCHANT_SPEND_LIMIT, PERIOD_CONFIGS } from './constants';
import type {
  ICategorySpend,
  IDateRange,
  IMerchantSpend,
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

function getBucketLabel(bucket: IBucket, config: IPeriodConfig): string {
  if (config.labelKind === 'weekday') {
    return DateFormat.toWeekday(bucket.start);
  }

  if (config.labelKind === 'dayOfMonth') {
    return DateFormat.toDayOfMonth(bucket.start);
  }

  return DateFormat.toShortMonth(bucket.start);
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
    label: index % config.labelEvery === 0 ? getBucketLabel(bucket, config) : '',
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

export function buildCategorySpends(purchases: IPurchase[]): ICategorySpend[] {
  const totals = new Map<MerchantCategoryType, number>();

  for (const { category, totalAmount } of purchases) {
    totals.set(category, (totals.get(category) ?? 0) + totalAmount);
  }

  return [...totals.entries()]
    .map(([category, amount]) => ({
      id: category,
      name: CATEGORY_LABELS[category],
      amount
    }))
    .sort((a, b) => b.amount - a.amount);
}

export function buildMerchantSpends(
  purchases: IPurchase[],
  merchants: IMerchant[]
): IMerchantSpend[] {
  const totals = new Map<string, { name: string; amount: number }>();

  for (const { merchantCnpj, merchantName, totalAmount } of purchases) {
    const current = totals.get(merchantCnpj);

    totals.set(merchantCnpj, {
      name: current?.name ?? merchantName,
      amount: (current?.amount ?? 0) + totalAmount
    });
  }

  return [...totals.entries()]
    .map(([cnpj, { name, amount }]) => {
      /** O apelido é o nome curto que cabe no eixo X; a razão social não cabe. */
      const alias = merchants.find((merchant) => merchant.cnpj === cnpj)?.alias;

      return { id: cnpj, name: alias?.trim() || name, amount };
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
 * Usa o histórico inteiro do produto, não o recorte do período: em `7 dias`
 * quase nunca há dois pontos, e o card sumia da tela sem explicação. Por isso a
 * legenda deste card fala de histórico, não do período selecionado.
 */
export function buildPriceTrend(
  product: IAccountProduct | undefined,
  pricePoints: IPricePoint[]
): IPriceTrend | null {
  if (!product || pricePoints.length < 2) {
    return null;
  }

  return {
    productName: product.name,
    prices: pricePoints.map(({ unitPrice }) => unitPrice)
  };
}
