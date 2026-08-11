import type { IReceipt } from './interfaces';

/** Temporário: substituir pelos dados vindos do módulo de dados. */
export const MOCK_USER_NAME = 'Pedro Henrique';

/** Temporário: substituir pelos dados vindos do módulo de dados. */
export const MOCK_AVERAGE_AMOUNT = 289.17;

/** Temporário: substituir pelos dados vindos do módulo de dados. */
export const MOCK_RECEIPTS: IReceipt[] = [
  {
    id: '1',
    merchantName: 'A. ANGELONI  CIA LTDA',
    purchasedAt: '2026-04-27',
    itemsCount: 35,
    totalAmount: 572.69
  },
  {
    id: '2',
    merchantName: 'COMERCIO DE MEDICAMENTOS BRAIR LTDA',
    purchasedAt: '2026-04-18',
    itemsCount: 5,
    totalAmount: 179
  },
  {
    id: '3',
    merchantName: 'A. ANGELONI  CIA LTDA',
    purchasedAt: '2026-04-15',
    itemsCount: 2,
    totalAmount: 29.29
  },
  {
    id: '4',
    merchantName: 'COOPERATIVA DE PRODUCAO E ABASTECIMENTO',
    purchasedAt: '2026-04-12',
    itemsCount: 23,
    totalAmount: 400.2
  },
  {
    id: '5',
    merchantName: 'COOPERATIVA DE PRODUCAO E ABASTECIMENTO',
    purchasedAt: '2026-02-15',
    itemsCount: 21,
    totalAmount: 264.68
  }
];
