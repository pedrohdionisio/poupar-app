import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps, ComponentType, Ref } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import type { TextInput, TextInputProps } from 'react-native';
import type { inputVariants } from './Input';

export interface IInputProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<ComponentProps<typeof TextInput>, 'value' | 'onChangeText'>,
    VariantProps<typeof inputVariants> {
  /** Caminho do campo no form — tipado a partir do schema via `control`. */
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  /** Ponto de troca para o `BottomSheetTextInput`. */
  InputComponent?: ComponentType<TextInputProps>;
  ref?: Ref<TextInput>;
  className?: string;
}
