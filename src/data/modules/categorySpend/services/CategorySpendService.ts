import { api } from '@data/config/api';
import type { ICategorySpend } from '../types/CategorySpend';
import type {
  IListCategorySpendsParams,
  IListCategorySpendsResponse
} from '../types/CategorySpendTypes';
import { ListCategorySpendsMapper } from './mappers/ListCategorySpendsMapper';

async function listCategorySpends(
  params: IListCategorySpendsParams
): Promise<ICategorySpend[]> {
  const { data } = await api.get<IListCategorySpendsResponse>('/category-spends', {
    params
  });

  return ListCategorySpendsMapper.toDomain(data);
}

export const CategorySpendService = { listCategorySpends };
