/** `'12,50'` -> `12.5`. O teclado numérico brasileiro produz vírgula. */
function parse(value: string): number {
  return Number(value.replace(',', '.'));
}

export const Decimal = {
  parse
};
