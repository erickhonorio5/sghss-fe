import { z } from 'zod';

export const addressSchema = z.object({
  street: z.string().min(3, "Rua deve ter pelo menos 3 caracteres"),
  number: z.string().min(1, "Número é obrigatório"),
  neighborhood: z.string().min(2, "Bairro deve ter pelo menos 2 caracteres"),
  city: z.string().min(2, "Cidade deve ter pelo menos 2 caracteres"),
  state: z.string().length(2, "Estado deve ter exatamente 2 caracteres"),
  zipCode: z.string().regex(/^\d{5}-\d{3}$|^\d{8}$/, "CEP deve estar no formato 00000-000 ou 00000000")
});

export const insuranceSchema = z.object({
  name: z.string().min(3, "Nome do plano deve ter pelo menos 3 caracteres"),
  number: z.string().min(1, "Número do plano é obrigatório"),
  expiryDate: z.string().refine(
    (date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime()) && parsedDate > new Date();
    },
    { message: "Data de validade deve ser uma data futura válida" }
  )
});

const cpfRegex = /^\d{11}$/;

export const patientSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  cpf: z.string().regex(cpfRegex, "CPF deve conter exatamente 11 dígitos numéricos"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().regex(/^\d{10,11}$/, "Telefone deve ter 10 ou 11 dígitos"),
  birthDate: z.string().refine(
    (date) => {
      const parsedDate = new Date(date);
      const now = new Date();
      const minAge = new Date();
      minAge.setFullYear(now.getFullYear() - 120);

      return !isNaN(parsedDate.getTime()) && parsedDate <= now && parsedDate >= minAge;
    },
    { message: "Data de nascimento deve ser uma data válida e não pode ser futura" }
  ),
  address: addressSchema,
  insurance: insuranceSchema,
  active: z.boolean().default(true)
});

export type PatientFormType = z.infer<typeof patientSchema>;

export const patientFiltersSchema = z.object({
  search: z.string().optional(),
  active: z.boolean().optional().nullable(),
  page: z.number().int().nonnegative().default(0),
  size: z.number().int().positive().default(10),
  sort: z.string().default("name,asc")
});

export type PatientFiltersType = z.infer<typeof patientFiltersSchema>;
