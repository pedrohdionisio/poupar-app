import type { ReactNode } from 'react';

export interface IChartCardProps {
  title: string;
  /** Texto curto à direita do título (`últimos 6 meses`). */
  caption?: string;
  children: ReactNode;
}
