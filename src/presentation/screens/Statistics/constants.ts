import type { MerchantCategoryType } from '@data/modules/purchase/types/PurchaseTypes';
import type { IPeriodConfig, IPeriodOption, TPeriodId } from './interfaces';

/** Ordem das pills do filtro, do período mais curto para o mais longo. */
export const PERIOD_OPTIONS: IPeriodOption[] = [
  { id: '7d', label: '7 dias' },
  { id: '15d', label: '15 dias' },
  { id: '30d', label: '30 dias' },
  { id: '3m', label: '3 meses' },
  { id: '6m', label: '6 meses' },
  { id: '1a', label: '1 ano' }
];

export const DEFAULT_PERIOD_ID: TPeriodId = '6m';

/** Legenda que acompanha o título dos cards e o subtítulo da tela. */
export const PERIOD_CAPTIONS: Record<TPeriodId, string> = {
  '7d': 'últimos 7 dias',
  '15d': 'últimos 15 dias',
  '30d': 'últimos 30 dias',
  '3m': 'últimos 3 meses',
  '6m': 'últimos 6 meses',
  '1a': 'últimos 12 meses'
};

/**
 * Cada janela é descrita pela quantidade de fatias, não por um total de dias: é
 * a contagem que define o intervalo pedido à API. Amarrar pelos dias fazia o
 * primeiro mês do gráfico começar antes do início do período e ser lido como
 * um mês inteiro — `6 meses` chegava a render 7 pontos.
 */
export const PERIOD_CONFIGS: Record<TPeriodId, IPeriodConfig> = {
  '7d': { bucketCount: 7, granularity: 'day', labelKind: 'weekday', labelEvery: 1 },
  '15d': { bucketCount: 15, granularity: 'day', labelKind: 'dayOfMonth', labelEvery: 3 },
  '30d': { bucketCount: 30, granularity: 'day', labelKind: 'dayOfMonth', labelEvery: 5 },
  '3m': { bucketCount: 3, granularity: 'month', labelKind: 'month', labelEvery: 1 },
  '6m': { bucketCount: 6, granularity: 'month', labelKind: 'month', labelEvery: 1 },
  '1a': { bucketCount: 12, granularity: 'month', labelKind: 'month', labelEvery: 1 }
};

/** A API só tem estas duas categorias (`Merchant.Category`). */
export const CATEGORY_LABELS: Record<MerchantCategoryType, string> = {
  SUPERMARKET: 'Supermercado',
  OTHER: 'Outros'
};

/** Quantas barras cabem no card de "onde você mais gasta". */
export const MERCHANT_SPEND_LIMIT = 5;
