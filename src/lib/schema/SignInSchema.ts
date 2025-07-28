import { z } from "zod";

export const SignInSchema = z.object({
    emailOrUsername: z.string().min(1, "Campo obrigatório"),
    password: z.string().min(6, "Senha inválida"),
    rememberMe: z.boolean().optional()
});

export type LoginSchemaType = z.infer<typeof SignInSchema>;