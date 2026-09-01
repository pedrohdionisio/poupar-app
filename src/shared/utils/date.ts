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

const MONTHS = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro'
];

/** `2026-04-27` -> `abril` */
function toMonth(value: Date | string): string {
  return MONTHS[parse(value).getMonth()] ?? '';
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

const DAY_MONTH_YEAR_PATTERN = /^(\d{2})\/(\d{2})\/(\d{4})$/;

/** `27042026` -> `27/04/2026`, aplicada enquanto o usuário digita. */
function maskDayMonthYear(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);

  return digits
    .replace(/^(\d{2})(\d)/, '$1/$2')
    .replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
}

function parseDayMonthYear(value: string): Date | null {
  const match = DAY_MONTH_YEAR_PATTERN.exec(value);

  if (!match) return null;

  const [, day, month, year] = match;

  const date = new Date(Number(year), Number(month) - 1, Number(day));

  /** `31/02` vira 03/03 no construtor: comparar de volta pega a data inexistente. */
  const isRealDate =
    date.getDate() === Number(day) && date.getMonth() === Number(month) - 1;

  return isRealDate ? date : null;
}

/** `27/04/2026` é uma data válida e não está no futuro? */
function isValidDayMonthYear(value: string): boolean {
  const date = parseDayMonthYear(value);

  if (!date) return false;

  return date.getTime() <= Date.now();
}

/**
 * `27/04/2026` -> `2026-04-27T15:00:00.000Z` (em BRT). A API exige data e hora
 * em UTC; assumimos meio-dia local porque é o horário que não muda de dia em
 * nenhum fuso do Brasil ao converter.
 *
 * Devolve `null` em data inválida em vez de cair para hoje: um util que às
 * vezes entrega a data pedida e às vezes a de hoje não tem contrato, e este
 * aqui vai alimentar também a importação vinda do QR da nota.
 */
function toIsoFromDayMonthYear(value: string): string | null {
  const date = parseDayMonthYear(value);

  if (!date) return null;

  date.setHours(12, 0, 0, 0);

  return date.toISOString();
}

export const DateFormat = {
  toDayMonth,
  toDayMonthYear,
  toWeekday,
  toShortMonth,
  toMonth,
  toDayOfMonth,
  maskDayMonthYear,
  isValidDayMonthYear,
  toIsoFromDayMonthYear
};
