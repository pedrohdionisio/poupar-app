/** `0.64` -> `64%` */
function format(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'percent',
    maximumFractionDigits: 0
  });
}

/** `-0.0913` -> `-9,1%`. Sempre com sinal, para leitura de variação. */
function formatChange(value: number): string {
  const formatted = Math.abs(value).toLocaleString('pt-BR', {
    style: 'percent',
    maximumFractionDigits: 1
  });

  return `${value < 0 ? '-' : '+'}${formatted}`;
}

export const Percent = {
  format,
  formatChange
};
