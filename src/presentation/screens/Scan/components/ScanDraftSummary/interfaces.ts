import type { IScanDraft } from '@data/modules/scan/types/Scan';

export interface IScanDraftSummaryProps {
  draft: IScanDraft;
  /**
   * Vem da escolha do primeiro passo — o draft não carrega mais o local. `null`
   * enquanto a lista de estabelecimentos não voltou do cache.
   */
  merchantName: string | null;
}
