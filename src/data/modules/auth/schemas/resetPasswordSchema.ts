import z from 'zod';

export const resetPasswordSchema = z.object({
  code: z.string().min(6, 'O código deve ter 6 dígitos'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres')
});

export type ResetPasswordFormType = z.infer<typeof resetPasswordSchema>;
