import api from "@/lib/axios";
import {
  PatientRequestDTO,
  PatientResponseDTO,
  PatientsResponseDTO
} from "@/types/patient";

export const createPatient = async (data: PatientRequestDTO): Promise<PatientResponseDTO> => {
  const response = await api.post("/patients", data);
  return response.data;
};

export const getPatients = async (
  page: number = 0,
  size: number = 10,
  sort: string = "name,asc",
  search?: string,
  active?: boolean
): Promise<PatientsResponseDTO> => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort: sort,
  });

  if (search) {
    params.append("search", search);
  }

  if (active !== undefined) {
    params.append("active", active.toString());
  }

  const response = await api.get(`/patients?${params.toString()}`);
  return response.data;
};

export const getPatientByCpf = async (cpf: string): Promise<PatientResponseDTO> => {
  const cleanCpf = cpf.replace(/\D/g, '');

  if (cleanCpf.length !== 11) {
    throw new Error('CPF deve conter 11 dígitos numéricos');
  }

  const response = await api.get(`/patients/cpf/${cleanCpf}`);
  return response.data;
};

