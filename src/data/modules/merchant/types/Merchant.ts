/**
 * Separado de `MerchantTypes.ts` de propósito: lá vive o espelho da API; aqui
 * vive o que a UI consome, já traduzido pelo mapper.
 */
export interface IMerchant {
  /** O CNPJ é a identidade: a API não expõe id próprio para o vínculo. */
  cnpj: string;
  /** Nome como apareceu na nota fiscal. */
  name: string;
  /** Apelido dado pelo usuário; quando vazio, exibimos `name`. */
  alias: string | null;
  purchasesCount: number;
  /** Data da última compra, em ISO. */
  lastPurchaseAt: string;
}
