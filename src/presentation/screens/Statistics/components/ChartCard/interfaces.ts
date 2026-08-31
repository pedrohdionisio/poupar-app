import type { ReactNode } from 'react';

export interface IChartCardProps {
  title: string;
  /** Texto curto à direita do título (`últimos 6 meses`). */
  caption?: string;
  /** Presente quando o título é o que troca o conteúdo do card. */
  onTitlePress?: () => void;
  /** Descreve a ação do título quando ele é tocável. */
  titleAccessibilityLabel?: string;
  children: ReactNode;
}
