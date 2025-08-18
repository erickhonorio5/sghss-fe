import { z } from "zod";
import { format } from "date-fns";
import { PatientRequestDTO } from "@/types/patient";

export const patientFormSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  cpf: z.string().min(11, "CPF inválido").max(14, "CPF inválido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  birthDate: z.date().optional().refine(
    (date) => !!date,
    {
      message: "Data de nascimento é obrigatória",
    }
  ),
  address: z.object({
    street: z.string().min(3, "Endereço deve ter pelo menos 3 caracteres"),
    number: z.string().min(1, "Número é obrigatório"),
    neighborhood: z.string().min(2, "Bairro deve ter pelo menos 2 caracteres"),
    city: z.string().min(2, "Cidade deve ter pelo menos 2 caracteres"),
    state: z.string().length(2, "Estado deve ter 2 caracteres"),
    zipCode: z.string().min(8, "CEP inválido").max(9, "CEP inválido"),
  }),
  insurance: z.object({
    name: z.string().min(2, "Nome do plano deve ter pelo menos 2 caracteres"),
    number: z.string().min(1, "Número do plano é obrigatório"),
    expiryDate: z.date().optional().refine(
      (date) => !!date,
      {
        message: "Data de validade é obrigatória",
      }
    ),
  }),
  active: z.boolean().default(true),
});

export type PatientFormValues = z.infer<typeof patientFormSchema>;

export const convertFormToDTO = (data: PatientFormValues): PatientRequestDTO => {
  if (!data.birthDate || !data.insurance.expiryDate) {
    throw new Error("Datas obrigatórias não preenchidas");
  }

  return {
    name: data.name,
    cpf: data.cpf.replace(/\D/g, ''),
    email: data.email,
    phone: data.phone.replace(/\D/g, ''),
    birthDate: format(data.birthDate, 'yyyy-MM-dd'),
    address: {
      street: data.address.street,
      number: data.address.number,
      neighborhood: data.address.neighborhood,
      city: data.address.city,
      state: data.address.state,
      zipCode: data.address.zipCode.replace(/\D/g, ''),
    },
    insurance: {
      name: data.insurance.name,
      number: data.insurance.number,
      expiryDate: format(data.insurance.expiryDate, 'yyyy-MM-dd'),
    },
    active: data.active,
  };
};

