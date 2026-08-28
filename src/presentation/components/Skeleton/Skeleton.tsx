import { cn } from '@shared/utils/cn';
import { cva } from 'class-variance-authority';
import Animated from 'react-native-reanimated';
import type { ISkeletonProps } from './interfaces';
import { useSkeletonController } from './useSkeletonController';

export const skeletonVariants = cva('bg-grays-200', {
  variants: {
    rounded: {
      sm: 'rounded',
      md: 'rounded-lg',
      lg: 'rounded-xl',
      xl: 'rounded-2xl',
      full: 'rounded-full'
    }
  },
  defaultVariants: {
    rounded: 'md'
  }
});

/**
 * Bloco cinza pulsante. Não anuncia nada para o leitor de tela: quem descreve o
 * carregamento é o container da composição, com um rótulo só.
 */
export function Skeleton({ rounded, className }: ISkeletonProps) {
  const { pulseStyle } = useSkeletonController();

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility='no-hide-descendants'
      className={cn(skeletonVariants({ rounded }), className)}
      style={pulseStyle}
    />
  );
}
