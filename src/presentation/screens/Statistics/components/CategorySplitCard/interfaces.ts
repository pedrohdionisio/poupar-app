import type { ICategorySlice } from '../../interfaces';

export interface ICategorySplitCardProps {
  /** Já ordenadas da maior para a menor: a paleta é consumida nessa ordem. */
  categorySlices: ICategorySlice[];
  /** Soma das fatias — não o total das compras, que inclui item sem categoria. */
  totalAmount: number;
  caption: string;
}
