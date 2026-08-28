const UNIT_LABELS = {
  UN: 'un',
  KG: 'kg',
  L: 'L'
} as const;

type UnitType = keyof typeof UNIT_LABELS;

const MILLI_IN_ONE_UNIT = 1000;

/** `2500` -> `2.5`. A API trafega quantidade fracionária em milésimos. */
function fromMilli(milli: number): number {
  return milli / MILLI_IN_ONE_UNIT;
}

/**
 * `2.5` -> `2,5`. Quantidade inteira não ganha casa decimal: item vendido por
 * unidade fica `1`, não `1,000`.
 */
function format(quantity: number): string {
  return quantity.toLocaleString('pt-BR', { maximumFractionDigits: 3 });
}

/** `(2.5, 'KG')` -> `2,5 kg`. */
function formatWithUnit(quantity: number, unit: UnitType): string {
  return `${format(quantity)} ${UNIT_LABELS[unit]}`;
}

export const Quantity = {
  fromMilli,
  format,
  formatWithUnit
};
