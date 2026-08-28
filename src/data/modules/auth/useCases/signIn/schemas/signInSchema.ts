import z from 'zod';

export const signInSchema = z.object({
  email: z.email('Formato de e-mail inválido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres')
});

export type SignInFormType = z.infer<typeof signInSchema>;
