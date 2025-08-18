'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientFormSchema, PatientFormValues } from "@/lib/schema/patientSchema";

export const usePatientForm = () => {
  return useForm<PatientFormValues>({
      resolver: zodResolver(patientFormSchema),
    defaultValues: {
      active: true,
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
      },
      name: "",
      cpf: "",
      email: "",
      phone: "",
    }
  });
};
