export interface IReceipt {
  id: string;
  merchantName: string;
  /** Data da compra em ISO (`YYYY-MM-DD`). */
  purchasedAt: string;
  itemsCount: number;
  /** Valor total em reais. */
  totalAmount: number;
}
