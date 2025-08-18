"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { usePatientForm } from "@/hooks/patients/usePatientForm";
import { useCreatePatientMutation } from "@/hooks/patients/usePatientMutation";
import { PatientFields } from "./PatientFields";
import { convertFormToDTO } from "@/lib/schema/patientSchema";
import { PatientFormValues } from "@/lib/schema/patientSchema";

interface PatientFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export function PatientForm({ onSuccess, onCancel }: PatientFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createPatientMutation = useCreatePatientMutation();
  const form = usePatientForm();

  function onSubmit(data: PatientFormValues) {
    if (!data.birthDate || !data.insurance.expiryDate) {
      toast.error("Preencha todas as datas obrigatórias");
      return;
    }

    setIsSubmitting(true);
    try {
      const patientData = convertFormToDTO(data);

      createPatientMutation.mutate(patientData, {
        onSuccess: () => {
          toast.success("Paciente cadastrado com sucesso!");
          if (onSuccess) {
            onSuccess();
          } else {
            router.push("/dashboard/patients");
          }
        },
        onError: (error: unknown) => {
          console.error("Erro ao cadastrar paciente:", error);
          const apiError = error as ApiError;
          const errorMessage = apiError.response?.data?.message || apiError.message || "Erro ao cadastrar paciente";
          toast.error(errorMessage);
        },
        onSettled: () => {
          setIsSubmitting(false);
        }
      });
    } catch (error) {
      console.error("Erro ao processar dados do formulário:", error);
      toast.error("Erro ao processar dados do formulário");
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <PatientFields control={form.control} />

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
    </Form>
  );
}
