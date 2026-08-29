import { Money } from '@shared/utils/money';
import { Quantity } from '@shared/utils/quantity';
import type { IImportPurchaseItem, IImportPurchasePayload } from '../../types/Purchase';
import type {
  IImportPurchaseBody,
  IImportPurchaseItemBody
} from '../../types/PurchaseTypes';

function toItemTotalCents(item: IImportPurchaseItem): number {
  return Money.toCents(item.quantity * item.unitPrice);
}

function toPersistenceItem(
  item: IImportPurchaseItem,
  index: number
): IImportPurchaseItemBody {
  return {
    /** A API exige `seq`; a ordem da lista na tela é a ordem da nota. */
    seq: index,
    description: item.description.trim(),
    quantityMilli: Quantity.toMilli(item.quantity),
    unit: item.unit,
    unitPriceCents: Money.toCents(item.unitPrice),
    totalCents: toItemTotalCents(item)
  };
}

/**
 * Exportado para o rodapé da tela somar exatamente igual. Arredondar por item e
 * depois somar dá resultado diferente de somar em reais e arredondar no fim —
 * a tela mostraria R$ 8,97 numa nota gravada como R$ 8,98.
 */
function getTotalAmount(items: IImportPurchaseItem[]): number {
  return Money.fromCents(
    items.reduce((total, item) => total + toItemTotalCents(item), 0)
  );
}

/**
 * O `totalCents` da nota sai da soma dos itens, não de um campo digitado: a API
 * aceita um total divergente sem reclamar, e aí a compra ficaria com um valor
 * que não corresponde a nada.
 */
function toPersistence(payload: IImportPurchasePayload): IImportPurchaseBody {
  const items = payload.items.map(toPersistenceItem);

  return {
    source: 'MANUAL',
    purchasedAt: payload.purchasedAt,
    merchant: {
      cnpj: payload.merchantCnpj,
      name: payload.merchantName.trim(),
      address: payload.merchantAddress.trim()
    },
    totalCents: items.reduce((total, item) => total + item.totalCents, 0),
    items
  };
}

export const ImportPurchaseMapper = {
  toPersistence,
  getTotalAmount
};
