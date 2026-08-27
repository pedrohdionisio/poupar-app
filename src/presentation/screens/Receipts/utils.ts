import type { IPurchase } from '@data/modules/purchase/types/Purchase';

export function getAverageAmount(purchases: IPurchase[]): number {
  if (purchases.length === 0) {
    return 0;
  }

  const total = purchases.reduce((sum, purchase) => sum + purchase.totalAmount, 0);

  return total / purchases.length;
}
