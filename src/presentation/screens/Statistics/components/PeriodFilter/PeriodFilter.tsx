import { ScrollView } from 'react-native';
import { PeriodFilterPill } from '../PeriodFilterPill/PeriodFilterPill';
import type { IPeriodFilterProps } from './interfaces';

const PILL_GAP = 8;

export function PeriodFilter({ options, selectedId, onSelect }: IPeriodFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className='grow-0 pt-8'
      contentContainerStyle={{ gap: PILL_GAP }}
    >
      {options.map(({ id, label }) => (
        <PeriodFilterPill
          key={id}
          label={label}
          isSelected={id === selectedId}
          onPress={() => onSelect(id)}
        />
      ))}
    </ScrollView>
  );
}
