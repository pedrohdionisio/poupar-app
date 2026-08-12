import { ScrollView } from 'react-native';
import { PeriodFilterPill } from '../PeriodFilterPill/PeriodFilterPill';
import type { IPeriodFilterProps } from './interfaces';

/**
 * O `px-5` da tela vira `-mx-5` aqui e volta como padding do conteúdo: assim as
 * pills começam alinhadas ao texto, mas rolam até a borda da tela.
 */
const SCREEN_HORIZONTAL_PADDING = 20;
const PILL_GAP = 8;

export function PeriodFilter({ options, selectedId, onSelect }: IPeriodFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className='-mx-5 grow-0 pt-3'
      contentContainerStyle={{
        paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
        gap: PILL_GAP
      }}
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
