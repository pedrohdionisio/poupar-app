import type {
  ICategorySpend,
  IMerchantSpend,
  IPeriodStatistics,
  TPeriodId
} from './interfaces';

/**
 * Temporário: substituir pelos dados vindos do módulo de dados, que passará a
 * receber o período selecionado e devolver essa mesma estrutura.
 */
export const MOCK_STATISTICS_BY_PERIOD: Record<TPeriodId, IPeriodStatistics> = {
  '7d': {
    spendSeries: [
      { label: 'seg', amount: 38.4 },
      { label: 'ter', amount: 52.9 },
      { label: 'qua', amount: 27.6 },
      { label: 'qui', amount: 61.3 },
      { label: 'sex', amount: 88.7 },
      { label: 'sáb', amount: 124.5 },
      { label: 'dom', amount: 42.2 }
    ],
    previousTotalAmount: 512.3,
    priceTrend: {
      productName: 'Café torrado e moído 500g',
      prices: [16.9, 16.4, 15.99, 15.49]
    }
  },
  '15d': {
    spendSeries: [
      { label: '28', amount: 142.3 },
      { label: '31', amount: 218.6 },
      { label: '03', amount: 96.4 },
      { label: '06', amount: 187.2 },
      { label: '09', amount: 167.9 }
    ],
    previousTotalAmount: 903.1,
    priceTrend: {
      productName: 'Café torrado e moído 500g',
      prices: [17.2, 16.9, 16.4, 15.99, 15.49]
    }
  },
  '30d': {
    spendSeries: [
      { label: 'sem 1', amount: 412.6 },
      { label: 'sem 2', amount: 318.9 },
      { label: 'sem 3', amount: 465.3 },
      { label: 'sem 4', amount: 289.9 }
    ],
    previousTotalAmount: 1602.4,
    priceTrend: {
      productName: 'Café torrado e moído 500g',
      prices: [17.8, 17.2, 16.4, 15.9, 15.49]
    }
  },
  '3m': {
    spendSeries: [
      { label: 'jun.', amount: 1445.7 },
      { label: 'jul.', amount: 1198.3 },
      { label: 'ago.', amount: 1165.85 }
    ],
    previousTotalAmount: 4384.2,
    priceTrend: {
      productName: 'Café torrado e moído 500g',
      prices: [17.45, 17.8, 16.4, 15.9, 15.49]
    }
  },
  '6m': {
    spendSeries: [
      { label: 'mar.', amount: 1512.4 },
      { label: 'abr.', amount: 1368.9 },
      { label: 'mai.', amount: 1523.15 },
      { label: 'jun.', amount: 1445.7 },
      { label: 'jul.', amount: 1198.3 },
      { label: 'ago.', amount: 1165.85 }
    ],
    previousTotalAmount: 8620.4,
    priceTrend: {
      productName: 'Café torrado e moído 500g',
      prices: [18.9, 17.45, 17.8, 16.4, 15.9, 15.49]
    }
  },
  '1a': {
    spendSeries: [
      { label: 'set.', amount: 1198.3 },
      { label: 'out.', amount: 1245.6 },
      { label: 'nov.', amount: 1362.4 },
      { label: 'dez.', amount: 1298.7 },
      { label: 'jan.', amount: 1180.2 },
      { label: 'fev.', amount: 1109.8 },
      { label: 'mar.', amount: 1512.4 },
      { label: 'abr.', amount: 1368.9 },
      { label: 'mai.', amount: 1523.15 },
      { label: 'jun.', amount: 1445.7 },
      { label: 'jul.', amount: 1198.3 },
      { label: 'ago.', amount: 1165.85 }
    ],
    previousTotalAmount: 14203.8,
    priceTrend: {
      productName: 'Café torrado e moído 500g',
      prices: [19.9, 18.4, 18.9, 17.45, 17.8, 16.4, 15.9, 15.49]
    }
  }
};

/**
 * Categorias e mercados são derivados do total do período por fatias fixas. É
 * mock: garante que os três cards contem a mesma história em qualquer filtro,
 * sem manter seis conjuntos de valores na mão.
 */
const MOCK_CATEGORY_SHARES = [
  { id: '1', name: 'Mercado', share: 0.64 },
  { id: '2', name: 'Farmácia', share: 0.13 },
  { id: '3', name: 'Padaria', share: 0.096 },
  { id: '4', name: 'Combustível', share: 0.085 },
  { id: '5', name: 'Outros', share: 0.049 }
];

const MOCK_MERCHANT_SHARES = [
  { id: '1', name: 'Angeloni', share: 0.388 },
  { id: '2', name: 'Coop', share: 0.239 },
  { id: '3', name: 'Bistek', share: 0.157 },
  { id: '4', name: 'Braier', share: 0.13 },
  { id: '5', name: 'Fort', share: 0.086 }
];

function toAmount(totalAmount: number, share: number): number {
  return Math.round(totalAmount * share * 100) / 100;
}

export function buildMockCategorySpends(totalAmount: number): ICategorySpend[] {
  return MOCK_CATEGORY_SHARES.map(({ id, name, share }) => ({
    id,
    name,
    amount: toAmount(totalAmount, share)
  }));
}

export function buildMockMerchantSpends(totalAmount: number): IMerchantSpend[] {
  return MOCK_MERCHANT_SHARES.map(({ id, name, share }) => ({
    id,
    name,
    amount: toAmount(totalAmount, share)
  }));
}
