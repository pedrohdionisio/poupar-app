import type { ICategorySpend } from '../../interfaces';

export interface ICategorySplitCardProps {
  /** Já ordenadas da maior para a menor: a paleta é consumida nessa ordem. */
  categorySpends: ICategorySpend[];
  totalAmount: number;
  caption: string;
}
