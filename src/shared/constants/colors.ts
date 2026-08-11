/**
 * Espelha as cores de `tailwind.config.js`. Use apenas onde a cor não pode vir
 * de `className` — props de ícones (lucide), `shadowColor`, `placeholderTextColor`.
 */
export const COLORS = {
  brand: {
    light: '#42D59E',
    main: '#2CBA80',
    dark: '#13915D'
  },
  grays: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A'
  },
  white: '#FFFFFF'
} as const;
