export interface IMerchant {
  id: string;
  /** Razão social como vem na nota fiscal. */
  legalName: string;
  /** Apelido dado pelo usuário; quando vazio, exibimos `legalName`. */
  nickname?: string;
  /** Data da última compra em ISO (`YYYY-MM-DD`). */
  lastPurchaseAt: string;
  purchasesCount: number;
  /** Total já gasto no estabelecimento, em reais. */
  totalAmount: number;
}
