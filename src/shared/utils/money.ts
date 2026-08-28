const CENTS_IN_ONE_REAL = 100;

/** `57269` -> `572.69`. A API trafega dinheiro em centavos inteiros. */
function fromCents(cents: number): number {
  return cents / CENTS_IN_ONE_REAL;
}

/** `572.69` -> `57269`. Arredonda porque a API só aceita inteiro. */
function toCents(amount: number): number {
  return Math.round(amount * CENTS_IN_ONE_REAL);
}

export const Money = {
  fromCents,
  toCents
};
