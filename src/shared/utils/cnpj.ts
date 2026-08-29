const CNPJ_PATTERN = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/;

const CNPJ_LENGTH = 14;

const DIGITS_ONLY_PATTERN = /^\d{14}$/;

/** `11111111111111` passa nos dígitos verificadores, mas não é CNPJ válido. */
const REPEATED_DIGITS_PATTERN = /^(\d)\1{13}$/;

/**
 * `12345678000199` -> `12.345.678/0001-99`. A API manda o CNPJ sem máscara;
 * valor fora do formato volta como veio, para não exibir lixo.
 */
function format(cnpj: string): string {
  return cnpj.replace(CNPJ_PATTERN, '$1.$2.$3/$4-$5');
}

function calculateCheckDigit(digits: number[]): number {
  let sum = 0;
  let weight = 2;

  for (let index = digits.length - 1; index >= 0; index--) {
    sum += (digits[index] ?? 0) * weight;
    weight = weight === 9 ? 2 : weight + 1;
  }

  const rest = sum % 11;

  return rest < 2 ? 0 : 11 - rest;
}

/** Só dígitos: o formulário aceita máscara, a API não. */
function unformat(cnpj: string): string {
  return cnpj.replace(/\D/g, '');
}

/**
 * Espelha `Merchant.isValidCnpj` da poupar-api. Vale validar aqui porque a API
 * recusa o cadastro inteiro por causa do CNPJ, e o erro dela não diz qual campo.
 */
function isValid(cnpj: string): boolean {
  const digits = unformat(cnpj);

  if (!DIGITS_ONLY_PATTERN.test(digits) || REPEATED_DIGITS_PATTERN.test(digits)) {
    return false;
  }

  const numbers = [...digits].map(Number);

  return (
    calculateCheckDigit(numbers.slice(0, 12)) === numbers[12] &&
    calculateCheckDigit(numbers.slice(0, 13)) === numbers[13]
  );
}

/** `12345678000199` -> `12.345.678/0001-99`, aplicada enquanto o usuário digita. */
function mask(value: string): string {
  const digits = unformat(value).slice(0, CNPJ_LENGTH);

  return digits
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}

export const Cnpj = {
  format,
  unformat,
  mask,
  isValid
};
