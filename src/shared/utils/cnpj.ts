const CNPJ_PATTERN = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/;

/**
 * `12345678000199` -> `12.345.678/0001-99`. A API manda o CNPJ sem máscara;
 * valor fora do formato volta como veio, para não exibir lixo.
 */
function format(cnpj: string): string {
  return cnpj.replace(CNPJ_PATTERN, '$1.$2.$3/$4-$5');
}

export const Cnpj = {
  format
};
