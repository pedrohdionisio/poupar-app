import z from 'zod';

/** Fonte única do limite: o `maxLength` do input lê daqui. */
export const ALIAS_MAX_LENGTH = 40;

export const editMerchantSchema = z.object({
  alias: z.string().max(ALIAS_MAX_LENGTH, `Use no máximo ${ALIAS_MAX_LENGTH} caracteres`)
});

export type EditMerchantFormType = z.infer<typeof editMerchantSchema>;
