import type { TextStyle } from 'react-native';
import { COLORS } from './colors';

/**
 * Paleta categórica dos gráficos: rampa da marca seguida de neutros. A ordem
 * importa — fatias e barras consomem daqui de cima para baixo, então o primeiro
 * item sempre cai na categoria de maior valor.
 */
export const CHART_PALETTE = [
  COLORS.brand.dark,
  COLORS.brand.main,
  COLORS.brand.light,
  COLORS.grays[400],
  COLORS.grays[300]
] as const;

/** Espessura do traço das linhas e raio do ponto de destaque. */
export const CHART_LINE = {
  thickness: 2.5,
  dotRadius: 5
} as const;

/**
 * Rótulos de eixo. Não dá para usar `className` aqui: o gifted-charts recebe os
 * rótulos como `style`, fora da árvore de componentes do NativeWind.
 */
export const CHART_AXIS_LABEL_STYLE: TextStyle = {
  color: COLORS.grays[400],
  fontSize: 11,
  fontFamily: 'Inter_500Medium'
};
