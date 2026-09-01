import { Money } from '@shared/utils/money';
import type { ICategorySpend } from '../../types/CategorySpend';
import type {
  ICategorySpendResponse,
  IListCategorySpendsResponse
} from '../../types/CategorySpendTypes';

function toDomainCategorySpend(categorySpend: ICategorySpendResponse): ICategorySpend {
  return {
    month: categorySpend.month,
    category: categorySpend.category,
    totalAmount: Money.fromCents(categorySpend.totalCents),
    itemCount: categorySpend.itemCount
  };
}

function toDomain(response: IListCategorySpendsResponse): ICategorySpend[] {
  return response.map(toDomainCategorySpend);
}

export const ListCategorySpendsMapper = {
  toDomain
};
