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
  // Remover caracteres não numéricos para garantir formato correto
  const cleanCpf = cpf.replace(/\D/g, '');

  if (cleanCpf.length !== 11) {
    throw new Error('CPF deve conter 11 dígitos numéricos');
  }

  const response = await api.get(`/patients/cpf/${cleanCpf}`);
  return response.data;
};

// Buscar paciente por ID
export const getPatientById = async (id: number): Promise<PatientResponseDTO> => {
  const response = await api.get(`/patients/${id}`);
  return response.data;
};

// Atualizar paciente
export const updatePatient = async (id: number, data: PatientRequestDTO): Promise<PatientResponseDTO> => {
  const response = await api.put(`/patients/${id}`, data);
  return response.data;
};

// Desativar paciente
export const deactivatePatient = async (id: number): Promise<void> => {
  await api.patch(`/patients/${id}/deactivate`);
};

// Ativar paciente
export const activatePatient = async (id: number): Promise<void> => {
  await api.patch(`/patients/${id}/activate`);
};

// Excluir paciente (caso exista essa funcionalidade)
export const deletePatient = async (id: number): Promise<void> => {
  await api.delete(`/patients/${id}`);
};
