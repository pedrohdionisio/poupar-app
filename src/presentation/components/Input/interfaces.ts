import type { ComponentProps, ComponentType, Ref } from 'react';
import type { TextInput, TextInputProps } from 'react-native';

export interface IInputProps extends ComponentProps<typeof TextInput> {
  error?: boolean;
  InputComponent?: ComponentType<TextInputProps>;
  ref?: Ref<TextInput>;
}
