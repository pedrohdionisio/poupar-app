import { Cnpj } from '@shared/utils/cnpj';
import z from 'zod';

/** Fonte única do limite: o `maxLength` do input lê daqui. */
export const MERCHANT_NAME_MAX_LENGTH = 60;

/** Comprimento do CNPJ já mascarado: `00.000.000/0000-00`. */
export const CNPJ_MASK_LENGTH = 18;

export const MERCHANT_CATEGORIES = ['SUPERMARKET', 'OTHER'] as const;

/**
 * Mesmo formulário do `useUpdateMerchant`: os dois endpoints aceitam o corpo
 * idêntico, e duplicar o schema criaria duas fontes da mesma regra.
 */
export const merchantSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Campo obrigatório')
    .max(
      MERCHANT_NAME_MAX_LENGTH,
      `Use no máximo ${MERCHANT_NAME_MAX_LENGTH} caracteres`
    ),
  category: z.enum(MERCHANT_CATEGORIES),
  /**
   * Opcional na API. Quando preenchido, vale conferir aqui: a API recusa o
   * cadastro inteiro por causa do CNPJ e o erro dela não diz qual campo falhou.
   */
  cnpj: z
    .string()
    .refine((value) => !value.trim() || Cnpj.isValid(value), 'CNPJ inválido')
});

export type MerchantFormType = z.infer<typeof merchantSchema>;
