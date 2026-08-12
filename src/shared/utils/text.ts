/** Minúsculas e sem acento, para comparar texto digitado com texto de tela. */
function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/** `('Açaí da Vila', 'acai')` -> `true`. Busca tolerante a acento e caixa. */
function includes(value: string, term: string): boolean {
  return normalize(value).includes(normalize(term));
}

export const TextMatch = {
  normalize,
  includes
};
