import { Money } from '@shared/utils/money';
import type { IAccountProduct } from '../../types/Product';
import type {
  IAccountProductResponse,
  IListAccountProductsResponse
} from '../../types/ProductTypes';

function toDomainProduct(product: IAccountProductResponse): IAccountProduct {
  return {
    productKey: product.productKey,
    name: product.name,
    purchasesCount: product.purchaseCount,
    lastUnitPrice: Money.fromCents(product.lastUnitPriceCents)
  };
}

function toDomain(response: IListAccountProductsResponse): IAccountProduct[] {
  return response.map(toDomainProduct);
}

export const ListAccountProductsMapper = {
  toDomain
};
