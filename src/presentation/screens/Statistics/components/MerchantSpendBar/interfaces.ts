export interface IMerchantSpendBarProps {
  name: string;
  amount: number;
  /** Fração do maior gasto do período, entre 0 e 1 — é o que dá a largura. */
  share: number;
  isHighest: boolean;
}
