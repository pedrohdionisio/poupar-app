import { api } from '@data/config/api';
import type { IAccountProduct, IPricePoint } from '../types/Product';
import type {
  IListAccountProductsResponse,
  IListPricePointsParams,
  IListPricePointsResponse
} from '../types/ProductTypes';
import { ListAccountProductsMapper } from './mappers/ListAccountProductsMapper';
import { ListPricePointsMapper } from './mappers/ListPricePointsMapper';

async function listAccountProducts(): Promise<IAccountProduct[]> {
  const { data } = await api.get<IListAccountProductsResponse>('/account-products');

  return ListAccountProductsMapper.toDomain(data);
}

async function listPricePoints(params: IListPricePointsParams): Promise<IPricePoint[]> {
  const { data } = await api.get<IListPricePointsResponse>('/price-points', { params });

  return ListPricePointsMapper.toDomain(data);
}

export const ProductService = { listAccountProducts, listPricePoints };
