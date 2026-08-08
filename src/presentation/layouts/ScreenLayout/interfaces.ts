import type { PropsWithChildren } from 'react';
import type { Edge } from 'react-native-safe-area-context';

export interface IScreenLayoutProps extends PropsWithChildren {
  edges?: Edge[];
  className?: string;
}
