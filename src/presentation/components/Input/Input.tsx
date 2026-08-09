import { cn } from '@shared/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, ComponentType, Ref } from 'react';
import { TextInput, type TextInputProps, View } from 'react-native';
import { AppText } from '../AppText/AppText';
import { useInputController } from './useInputController';

interface IInputProps
  extends ComponentProps<typeof TextInput>,
    VariantProps<typeof inputVariants> {
  error?: string;
  InputComponent?: ComponentType<TextInputProps>;
  ref?: Ref<TextInput>;
  className?: string;
  label: string;
  name: string;
}

const inputVariants = cva(
  'h-[52px] rounded-[10px] border bg-support-white px-[14px] font-normal text-base text-support-black',
  {
    variants: {
      status: {
        default: 'border-grays-400',
        focus: 'border-grays-600',
        error: 'border-red-400'
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

export function Input({
  readOnly,
  error,
  InputComponent = TextInput,
  className,
  name,
  label,
  onFocus,
  onBlur,
  ...rest
}: IInputProps) {
  const { isFocused, handleBlur, handleFocus } = useInputController();

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
          onBlur?.(e);
        }}
        autoCapitalize='none'
        readOnly={readOnly}
        autoCorrect={false}
        {...rest}
      />

      {error && (
        <AppText className='text-red-400' size='sm'>
          {error}
        </AppText>
      )}
    </View>
  );
}
