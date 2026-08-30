import type { ComponentType } from 'react';
import type { TextInputProps } from 'react-native';

export interface ISearchInputProps {
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  onClear: () => void;
  /** Ponto de troca para o `BottomSheetTextInput`. */
  InputComponent?: ComponentType<TextInputProps>;
  className?: string;
}
