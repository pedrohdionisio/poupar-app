import z from 'zod';

export const updateNameSchema = z.object({
  name: z.string().trim().min(1, 'Campo obrigatório')
});

export type UpdateNameFormType = z.infer<typeof updateNameSchema>;
