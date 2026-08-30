import { Money } from '@shared/utils/money';
import { Quantity } from '@shared/utils/quantity';
import type { IConfirmedScan, IScanDraft, IScanDraftItem } from '../../types/Scan';
import type {
  IConfirmScanBody,
  IConfirmScanResponse,
  IScanDraftItemResponse
} from '../../types/ScanTypes';

function toPersistenceItem(item: IScanDraftItem): IScanDraftItemResponse {
  return {
    seq: item.seq,
    description: item.description,
    merchantCode: item.merchantCode,
    gtin: item.gtin,
    quantityMilli: Quantity.toMilli(item.quantity),
    unit: item.unit,
    unitPriceCents: Money.toCents(item.unitPrice),
    totalCents: Money.toCents(item.totalAmount),
    discountCents: Money.toCents(item.discountAmount)
  };
}

/**
 * O corpo é o mesmo draft que a API extraiu. Ele é remontado a partir do
 * domínio, e não ecoado da resposta, porque é o domínio que a tela segura — a
 * regra do projeto é que a tradução centavos↔reais aconteça só aqui.
 */
function toPersistence(draft: IScanDraft): IConfirmScanBody {
  return {
    purchasedAt: draft.purchasedAt,
    accessKey: draft.accessKey,
    merchant: draft.merchant,
    totalCents: Money.toCents(draft.totalAmount),
    discountCents: Money.toCents(draft.discountAmount),
    items: draft.items.map(toPersistenceItem)
  };
}

function toDomain(response: IConfirmScanResponse): IConfirmedScan {
  return {
    purchaseId: response.purchaseId,
    purchasedAt: response.purchasedAt,
    itemsCount: response.itemCount,
    totalAmount: Money.fromCents(response.totalCents)
  };
}

export const ConfirmScanMapper = { toPersistence, toDomain };
