import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  username: z.string().min(4, "Username deve ter pelo menos 4 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  rememberMe: z.boolean().optional(),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
