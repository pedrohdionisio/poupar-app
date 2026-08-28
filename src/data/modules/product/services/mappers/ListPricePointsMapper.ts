import { Money } from '@shared/utils/money';
import type { IPricePoint } from '../../types/Product';
import type {
  IListPricePointsResponse,
  IPricePointResponse
} from '../../types/ProductTypes';

function toDomainPricePoint(pricePoint: IPricePointResponse): IPricePoint {
  return {
    purchasedAt: pricePoint.purchasedAt,
    unitPrice: Money.fromCents(pricePoint.unitPriceCents)
  };
}

function toDomain(response: IListPricePointsResponse): IPricePoint[] {
  return response.map(toDomainPricePoint);
}

export const ListPricePointsMapper = {
  toDomain
};
