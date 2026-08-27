import z from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.email('Formato de e-mail inválido')
});

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>;
