import z from 'zod';

export const signUpSchema = z.object({
  name: z.string().min(1, 'Campo obrigatório'),
  email: z.email('Formato de e-mail inválido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres')
});

export type SignUpFormType = z.infer<typeof signUpSchema>;
