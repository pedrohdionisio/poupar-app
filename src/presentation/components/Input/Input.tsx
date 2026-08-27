import { cn } from '@shared/utils/cn';
import { cva } from 'class-variance-authority';
import { type FieldValues, useController } from 'react-hook-form';
import { TextInput, View } from 'react-native';
import { AppText } from '../AppText/AppText';
import type { IInputProps } from './interfaces';
import { useInputController } from './useInputController';

export const inputVariants = cva(
  'h-[52px] rounded-[10px] border bg-white px-[14px] font-normal text-base text-grays-900',
  {
    variants: {
      status: {
        default: 'border-grays-400',
        focus: 'border-grays-600',
        error: 'border-danger'
      },
      disabled: {
        true: 'opacity-50',
        false: 'opacity-100'
      }
    },
    defaultVariants: {
      status: 'default',
      disabled: false
    }
  }
);

export function Input<TFieldValues extends FieldValues = FieldValues>({
  readOnly,
  InputComponent = TextInput,
  className,
  name,
  control,
  label,
  onFocus,
  onBlur,
  ...rest
}: IInputProps<TFieldValues>) {
  const { isFocused, handleBlur, handleFocus } = useInputController();

  const { field, fieldState } = useController({ name, control });

  const error = fieldState.error?.message;

  return (
    <View className='gap-1'>
      {label && <AppText size='sm'>{label}</AppText>}

      <InputComponent
        className={cn(
          inputVariants({
            status: error ? 'error' : isFocused ? 'focus' : 'default',
            disabled: !!readOnly
          }),
          className
        )}
        placeholderTextColor='#7A7A80'
        onFocus={(e) => {
          handleFocus();
          onFocus?.(e);
        }}
        onBlur={(e) => {
          handleBlur();
          /** Encadeado para que `mode: 'onBlur'` funcione no form. */
          field.onBlur();
          onBlur?.(e);
        }}
        autoCapitalize='none'
        readOnly={readOnly}
        autoCorrect={false}
        value={field.value}
        onChangeText={field.onChange}
        {...rest}
      />

      {error && (
        <AppText className='text-danger' size='sm'>
          {error}
        </AppText>
      )}
    </View>
  );
}
