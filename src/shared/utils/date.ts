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

/** Só data, sem hora nem fuso: `2026-04-27`. */
const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Dois casos opostos, por isso o teste explícito:
 *
 * - `YYYY-MM-DD` puro o construtor `Date` interpreta como UTC, o que adianta o
 *   dia em fusos negativos — montamos em horário local na mão.
 * - ISO com hora (o que a API manda em `purchasedAt`) é um instante UTC real: aí
 *   o construtor é que está certo, porque converte para o fuso do aparelho.
 *   Cortar o prefixo aqui mostraria 28/04 numa compra feita às 22h de 27/04.
 */
function parse(value: Date | string): Date {
  if (value instanceof Date) return value;

  const match = DATE_ONLY_PATTERN.exec(value);

  if (!match) return new Date(value);

  const [, year, month, day] = match;

  return new Date(Number(year), Number(month) - 1, Number(day));
}

/** `2026-04-27` -> `27 de abr.` */
function toDayMonth(value: Date | string): string {
  const date = parse(value);

  return `${date.getDate()} de ${SHORT_MONTHS[date.getMonth()] ?? ''}`;
}

const SHORT_WEEKDAYS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

/** `2026-04-27` -> `seg` */
function toWeekday(value: Date | string): string {
  return SHORT_WEEKDAYS[parse(value).getDay()] ?? '';
}

/** `2026-04-27` -> `abr.` */
function toShortMonth(value: Date | string): string {
  return SHORT_MONTHS[parse(value).getMonth()] ?? '';
}

/** `2026-04-07` -> `07` */
function toDayOfMonth(value: Date | string): string {
  return String(parse(value).getDate()).padStart(2, '0');
}

/** `2026-04-27` -> `27 de abr. de 2026` */
function toDayMonthYear(value: Date | string): string {
  const date = parse(value);

  return `${date.getDate()} de ${SHORT_MONTHS[date.getMonth()] ?? ''} de ${date.getFullYear()}`;
}

export const DateFormat = {
  toDayMonth,
  toDayMonthYear,
  toWeekday,
  toShortMonth,
  toDayOfMonth
};
