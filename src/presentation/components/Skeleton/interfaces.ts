import type { VariantProps } from 'class-variance-authority';
import type { skeletonVariants } from './Skeleton';

export interface ISkeletonProps extends VariantProps<typeof skeletonVariants> {
  /** O tamanho vem daqui: `h-4 w-32`, `h-11 w-11`, `h-28 w-full`. */
  className?: string;
}
