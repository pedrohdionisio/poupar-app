const SHORT_MONTHS = [
  'jan.',
  'fev.',
  'mar.',
  'abr.',
  'mai.',
  'jun.',
  'jul.',
  'ago.',
  'set.',
  'out.',
  'nov.',
  'dez.'
];

/**
 * `YYYY-MM-DD` é interpretado como UTC pelo construtor `Date`, o que adianta o
 * dia em fusos negativos. Por isso montamos a data em horário local na mão.
 */
function parse(value: Date | string): Date {
  if (value instanceof Date) return value;

  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);

  if (!match) return new Date(value);

  const [, year, month, day] = match;

  return new Date(Number(year), Number(month) - 1, Number(day));
}

/** `2026-04-27` -> `27 de abr.` */
function toDayMonth(value: Date | string): string {
  const date = parse(value);

  return `${date.getDate()} de ${SHORT_MONTHS[date.getMonth()] ?? ''}`;
}

export const DateFormat = {
  toDayMonth
};
