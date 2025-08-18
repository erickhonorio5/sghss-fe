import { useMutation } from "@tanstack/react-query";
import {
  createPatient,
} from "@/services/patientService";
import { PatientRequestDTO } from "@/types/patient";

export const useCreatePatientMutation = () => {
  return useMutation({
    mutationFn: (data: PatientRequestDTO) => createPatient(data)
  });
};
