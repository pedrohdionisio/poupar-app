import { cn } from '@shared/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { Text } from 'react-native';

const appTextVariants = cva('', {
  variants: {
    /** `text` usa Inter, `title` usa Archivo. */
    variant: {
      text: '',
      title: ''
    },
    /** Tamanho + line-height base (ratio 1.5, usado por `text`). */
    size: {
      xs: 'text-[12px] leading-[18px]',
      sm: 'text-[14px] leading-[21px]',
      md: 'text-[16px] leading-[24px]',
      lg: 'text-[18px] leading-[27px]',
      xl: 'text-[20px] leading-[30px]',
      '2xl': 'text-[24px] leading-[36px]',
      '3xl': 'text-[32px] leading-[48px]',
      '4xl': 'text-[40px] leading-[60px]',
      '5xl': 'text-[48px] leading-[72px]',
      '6xl': 'text-[56px] leading-[84px]'
    },
    /** Resolvido junto de `variant` para a família concreta da fonte. */
    weight: {
      regular: '',
      medium: '',
      semibold: '',
      bold: ''
    },
    color: {
      default: 'text-grays-700',
      strong: 'text-grays-900',
      muted: 'text-grays-500',
      subtle: 'text-grays-400',
      inverse: 'text-white',
      brand: 'text-brand-main',
      brandLight: 'text-brand-light'
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify'
    },
    transform: {
      none: 'normal-case',
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize'
    },
    decoration: {
      none: 'no-underline',
      underline: 'underline',
      'line-through': 'line-through'
    }
  },
  compoundVariants: [
    // Família da fonte: variant x weight.
    { variant: 'text', weight: 'regular', class: 'font-inter-regular' },
    { variant: 'text', weight: 'medium', class: 'font-inter-medium' },
    { variant: 'text', weight: 'semibold', class: 'font-inter-semibold' },
    { variant: 'text', weight: 'bold', class: 'font-inter-bold' },
    { variant: 'title', weight: 'regular', class: 'font-archivo-regular' },
    { variant: 'title', weight: 'medium', class: 'font-archivo-medium' },
    { variant: 'title', weight: 'semibold', class: 'font-archivo-semibold' },
    { variant: 'title', weight: 'bold', class: 'font-archivo-bold' },

    // Títulos usam line-height mais fechado (ratio ~1.2).
    { variant: 'title', size: 'xs', class: 'leading-[14px]' },
    { variant: 'title', size: 'sm', class: 'leading-[17px]' },
    { variant: 'title', size: 'md', class: 'leading-[19px]' },
    { variant: 'title', size: 'lg', class: 'leading-[22px]' },
    { variant: 'title', size: 'xl', class: 'leading-[24px]' },
    { variant: 'title', size: '2xl', class: 'leading-[29px]' },
    { variant: 'title', size: '3xl', class: 'leading-[38px]' },
    { variant: 'title', size: '4xl', class: 'leading-[48px]' },
    { variant: 'title', size: '5xl', class: 'leading-[58px]' },
    { variant: 'title', size: '6xl', class: 'leading-[67px]' }
  ],
  defaultVariants: {
    variant: 'text',
    size: 'md',
    color: 'default',
    align: 'left',
    transform: 'none',
    decoration: 'none'
  }
});

interface IAppTextProps
  extends ComponentProps<typeof Text>,
    VariantProps<typeof appTextVariants> {
  className?: string;
}

export function AppText({
  children,
  variant = 'text',
  size,
  weight,
  color,
  align,
  transform,
  decoration,
  className,
  ...rest
}: IAppTextProps) {
  const resolvedWeight = weight ?? (variant === 'title' ? 'semibold' : 'regular');

  return (
    <Text
      className={cn(
        appTextVariants({
          variant,
          size,
          weight: resolvedWeight,
          color,
          align,
          transform,
          decoration
        }),
        className
      )}
      {...rest}
    >
      {children}
    </Text>
  );
}
