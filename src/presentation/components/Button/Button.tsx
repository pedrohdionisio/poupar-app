import { AppText } from '@presentation/components/AppText/AppText';
import { cn } from '@shared/utils/cn';
import { cva } from 'class-variance-authority';
import { ActivityIndicator, Platform, Pressable, View } from 'react-native';
import type { IButtonProps } from './interfaces';

export const buttonVariants = cva('items-center justify-center', {
  variants: {
    variant: {
      primary: 'bg-brand-main',
      ghost: 'bg-transparent'
    },
    size: {
      default: 'px-6 py-[14px]',
      icon: 'h-12 w-12',
      fit: 'h-fit w-fit'
    },
    disabled: {
      true: 'opacity-50',
      false: 'opacity-100'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
    disabled: false
  }
});

export function Button({
  children,
  variant = 'primary',
  size,
  disabled,
  className,
  isLoading = false,
  ...rest
}: IButtonProps) {
  return (
    <View className='overflow-hidden rounded-xl'>
      <Pressable
        {...rest}
        className={cn(
          buttonVariants({
            variant,
            size,
            disabled: !!disabled
          }),
          Platform.OS === 'ios' && 'active:opacity-70',
          className
        )}
        android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
        disabled={disabled}
      >
        {isLoading ? (
          <ActivityIndicator className='text-white' size={25} />
        ) : typeof children === 'string' ? (
          <AppText
            className={cn(
              variant === 'primary' ? 'font-bold' : 'font-medium',
              variant === 'ghost' ? 'text-brand-main' : 'text-white'
            )}
            size={variant === 'primary' ? 'md' : 'sm'}
          >
            {children}
          </AppText>
        ) : (
          children
        )}
      </Pressable>
    </View>
  );
}
