import type { IMerchant } from './interfaces';

/** Temporário: substituir pelos dados vindos do módulo de dados. */
export const MOCK_MERCHANTS: IMerchant[] = [
  {
    id: '1',
    legalName: 'A. ANGELONI  CIA LTDA',
    nickname: 'Angeloni',
    lastPurchaseAt: '2026-04-27',
    purchasesCount: 18,
    totalAmount: 4231.9
  },
  {
    id: '2',
    legalName: 'COMERCIO DE MEDICAMENTOS BRAIR LTDA',
    lastPurchaseAt: '2026-04-18',
    purchasesCount: 6,
    totalAmount: 812.4
  },
  {
    id: '3',
    legalName: 'COOPERATIVA DE PRODUCAO E ABASTECIMENTO',
    nickname: 'Cooper',
    lastPurchaseAt: '2026-04-12',
    purchasesCount: 11,
    totalAmount: 2678.15
  },
  {
    id: '4',
    legalName: 'PADARIA E CONFEITARIA SAO JORGE ME',
    lastPurchaseAt: '2026-04-05',
    purchasesCount: 9,
    totalAmount: 486.3
  },
  {
    id: '5',
    legalName: 'POSTO DE COMBUSTIVEIS IPIRANGA CENTRO LTDA',
    nickname: 'Posto do centro',
    lastPurchaseAt: '2026-03-28',
    purchasesCount: 14,
    totalAmount: 3120.75
  },
  {
    id: '6',
    legalName: 'HORTIFRUTI VILA NOVA COMERCIO DE ALIMENTOS',
    lastPurchaseAt: '2026-03-19',
    purchasesCount: 4,
    totalAmount: 289.6
  },
  {
    id: '7',
    legalName: 'RESTAURANTE E LANCHONETE DONA MARIA EIRELI',
    lastPurchaseAt: '2026-02-24',
    purchasesCount: 3,
    totalAmount: 197.8
  }
];
