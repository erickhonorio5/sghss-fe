import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { formatCPF, formatPhone } from "@/lib/formatters";

import { createPatient } from "@/services/patientService";
import { PatientRequestDTO } from "@/types/patient";

// Schema do formulário
const patientFormSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  cpf: z.string().min(11, "CPF inválido").max(14, "CPF inválido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  birthDate: z.date({
    required_error: "Data de nascimento é obrigatória",
  }),
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
    expiryDate: z.date({
      required_error: "Data de validade é obrigatória",
    }),
  }),
  active: z.boolean().default(true),
});

type PatientFormValues = z.infer<typeof patientFormSchema>;

interface PatientFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function PatientForm({ onSuccess, onCancel }: PatientFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Valores padrão do formulário
  const defaultValues: Partial<PatientFormValues> = {
    active: true,
    birthDate: undefined,
    address: {
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
    },
    insurance: {
      name: "",
      number: "",
      expiryDate: undefined,
    },
  };

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: PatientFormValues) => {
    setIsSubmitting(true);
    try {
      // Formatando os dados para o formato da API
      const patientData: PatientRequestDTO = {
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

      // Enviando para a API
      await createPatient(patientData);

      toast.success("Paciente cadastrado com sucesso!");

      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/dashboard/patients");
      }
    } catch (error: any) {
      console.error("Erro ao cadastrar paciente:", error);
      toast.error(error.response?.data?.message || "Erro ao cadastrar paciente");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Formatação de inputs
  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleanValue = value.replace(/\D/g, "");
    const formattedValue = formatCPF(cleanValue);
    form.setValue("cpf", formattedValue);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleanValue = value.replace(/\D/g, "");
    const formattedValue = formatPhone(cleanValue);
    form.setValue("phone", formattedValue);
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleanValue = value.replace(/\D/g, "");
    let formattedValue = cleanValue;

    if (cleanValue.length > 5) {
      formattedValue = `${cleanValue.slice(0, 5)}-${cleanValue.slice(5, 8)}`;
    }

    form.setValue("address.zipCode", formattedValue);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nome completo</Label>
          <Input
            id="name"
            placeholder="Nome completo do paciente"
            {...form.register("name")}
            className={cn(form.formState.errors.name && "border-red-500")}
          />
          {form.formState.errors.name && (
            <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cpf">CPF</Label>
          <Input
            id="cpf"
            placeholder="000.000.000-00"
            {...form.register("cpf")}
            onChange={handleCPFChange}
            className={cn(form.formState.errors.cpf && "border-red-500")}
          />
          {form.formState.errors.cpf && (
            <p className="text-xs text-red-500">{form.formState.errors.cpf.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="email@exemplo.com"
            {...form.register("email")}
            className={cn(form.formState.errors.email && "border-red-500")}
          />
          {form.formState.errors.email && (
            <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            placeholder="(00) 00000-0000"
            {...form.register("phone")}
            onChange={handlePhoneChange}
            className={cn(form.formState.errors.phone && "border-red-500")}
          />
          {form.formState.errors.phone && (
            <p className="text-xs text-red-500">{form.formState.errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthDate">Data de nascimento</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="birthDate"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !form.getValues("birthDate") && "text-muted-foreground",
                  form.formState.errors.birthDate && "border-red-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {form.getValues("birthDate") ? (
                  format(form.getValues("birthDate"), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                ) : (
                  <span>Selecione uma data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={form.getValues("birthDate")}
                onSelect={(date) => form.setValue("birthDate", date as Date)}
                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                initialFocus
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>
          {form.formState.errors.birthDate && (
            <p className="text-xs text-red-500">{form.formState.errors.birthDate.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 pt-6">
            <Checkbox
              id="active"
              checked={form.getValues("active")}
              onCheckedChange={(checked) => form.setValue("active", checked as boolean)}
            />
            <Label htmlFor="active" className="cursor-pointer">Paciente ativo</Label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Endereço</h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="street">Logradouro</Label>
              <Input
                id="street"
                placeholder="Rua, Avenida, etc."
                {...form.register("address.street")}
                className={cn(form.formState.errors.address?.street && "border-red-500")}
              />
              {form.formState.errors.address?.street && (
                <p className="text-xs text-red-500">{form.formState.errors.address.street.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="number">Número</Label>
              <Input
                id="number"
                placeholder="123"
                {...form.register("address.number")}
                className={cn(form.formState.errors.address?.number && "border-red-500")}
              />
              {form.formState.errors.address?.number && (
                <p className="text-xs text-red-500">{form.formState.errors.address.number.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input
                id="neighborhood"
                placeholder="Nome do bairro"
                {...form.register("address.neighborhood")}
                className={cn(form.formState.errors.address?.neighborhood && "border-red-500")}
              />
              {form.formState.errors.address?.neighborhood && (
                <p className="text-xs text-red-500">{form.formState.errors.address.neighborhood.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode">CEP</Label>
              <Input
                id="zipCode"
                placeholder="00000-000"
                {...form.register("address.zipCode")}
                onChange={handleZipCodeChange}
                className={cn(form.formState.errors.address?.zipCode && "border-red-500")}
              />
              {form.formState.errors.address?.zipCode && (
                <p className="text-xs text-red-500">{form.formState.errors.address.zipCode.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                placeholder="Nome da cidade"
                {...form.register("address.city")}
                className={cn(form.formState.errors.address?.city && "border-red-500")}
              />
              {form.formState.errors.address?.city && (
                <p className="text-xs text-red-500">{form.formState.errors.address.city.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">Estado (UF)</Label>
              <Input
                id="state"
                placeholder="SP"
                maxLength={2}
                {...form.register("address.state")}
                className={cn(
                  "uppercase",
                  form.formState.errors.address?.state && "border-red-500"
                )}
                onBlur={(e) => form.setValue("address.state", e.target.value.toUpperCase())}
              />
              {form.formState.errors.address?.state && (
                <p className="text-xs text-red-500">{form.formState.errors.address.state.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Plano de Saúde</h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="insuranceName">Nome do plano</Label>
              <Input
                id="insuranceName"
                placeholder="Nome do convênio"
                {...form.register("insurance.name")}
                className={cn(form.formState.errors.insurance?.name && "border-red-500")}
              />
              {form.formState.errors.insurance?.name && (
                <p className="text-xs text-red-500">{form.formState.errors.insurance.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="insuranceNumber">Número da carteirinha</Label>
              <Input
                id="insuranceNumber"
                placeholder="123456789"
                {...form.register("insurance.number")}
                className={cn(form.formState.errors.insurance?.number && "border-red-500")}
              />
              {form.formState.errors.insurance?.number && (
                <p className="text-xs text-red-500">{form.formState.errors.insurance.number.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">Validade</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="expiryDate"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !form.getValues("insurance.expiryDate") && "text-muted-foreground",
                      form.formState.errors.insurance?.expiryDate && "border-red-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.getValues("insurance.expiryDate") ? (
                      format(form.getValues("insurance.expiryDate"), "dd/MM/yyyy")
                    ) : (
                      <span>Selecione uma data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={form.getValues("insurance.expiryDate")}
                    onSelect={(date) => form.setValue("insurance.expiryDate", date as Date)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
              {form.formState.errors.insurance?.expiryDate && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.insurance.expiryDate.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="bg-primary text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  );
}
