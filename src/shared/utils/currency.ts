function format(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

/** `3101.25` -> `R$ 3,1 mil`. Para espaços apertados, como o centro de um donut. */
function formatCompact(value: number): string {
  if (Math.abs(value) < 1000) return format(value);

  const inThousands = (value / 1000).toLocaleString('pt-BR', {
    maximumFractionDigits: 1
  });

  return `R$ ${inThousands} mil`;
}

export const Currency = {
  format,
  formatCompact
};
