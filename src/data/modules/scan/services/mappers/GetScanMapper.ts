import { Money } from '@shared/utils/money';
import { Quantity } from '@shared/utils/quantity';
import type { IScan, IScanDraft } from '../../types/Scan';
import type {
  IGetScanResponse,
  IScanDraftItemResponse,
  IScanDraftResponse
} from '../../types/ScanTypes';

function toDomainItem(item: IScanDraftItemResponse) {
  return {
    seq: item.seq,
    description: item.description,
    merchantCode: item.merchantCode,
    gtin: item.gtin,
    quantity: Quantity.fromMilli(item.quantityMilli),
    unit: item.unit,
    unitPrice: Money.fromCents(item.unitPriceCents),
    totalAmount: Money.fromCents(item.totalCents),
    discountAmount: Money.fromCents(item.discountCents)
  };
}

function toDomainDraft(draft: IScanDraftResponse): IScanDraft {
  return {
    purchasedAt: draft.purchasedAt,
    accessKey: draft.accessKey,
    merchant: draft.merchant,
    totalAmount: Money.fromCents(draft.totalCents),
    discountAmount: Money.fromCents(draft.discountCents),
    items: draft.items.map(toDomainItem)
  };
}

function toDomain(response: IGetScanResponse): IScan {
  return {
    id: response.id,
    status: response.status,
    draft: response.draft ? toDomainDraft(response.draft) : null,
    purchaseId: response.purchaseId,
    errorCode: response.errorCode
  };
}

export const GetScanMapper = { toDomain };
