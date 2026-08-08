import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import type { Pressable } from 'react-native';
import type { buttonVariants } from './Button';

export interface IButtonProps
  extends ComponentProps<typeof Pressable>,
    Omit<VariantProps<typeof buttonVariants>, 'disabled'> {
  className?: string;
  isLoading?: boolean;
}
