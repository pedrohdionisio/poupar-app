import type { IPeriodOption, TPeriodId } from './interfaces';

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
