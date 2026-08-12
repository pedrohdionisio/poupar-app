import type { IPeriodOption, TPeriodId } from '../../interfaces';

export interface IPeriodFilterProps {
  options: IPeriodOption[];
  selectedId: TPeriodId;
  onSelect: (id: TPeriodId) => void;
}
