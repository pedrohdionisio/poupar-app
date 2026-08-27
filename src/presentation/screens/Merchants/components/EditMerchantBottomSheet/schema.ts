import z from 'zod';

/**
 * Colocado aqui de propósito: a convenção manda schemas em
 * `data/modules/<módulo>/schemas/`, mas o módulo de dados de estabelecimentos
 * ainda não existe (a tela roda em cima de mocks). Mover quando ele nascer.
 */
export const editMerchantSchema = z.object({
  nickname: z.string().max(40)
});

export type EditMerchantFormType = z.infer<typeof editMerchantSchema>;
