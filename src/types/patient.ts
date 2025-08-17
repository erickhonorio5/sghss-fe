export interface Address {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Insurance {
  name: string;
  number: string;
  expiryDate: string;
}

export interface PatientRequestDTO {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  birthDate: string;
  address: Address;
  insurance: Insurance;
  active: boolean;
}

export interface PatientResponseDTO {
  id: number;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  birthDate: string;
  address: Address;
  insurance: Insurance;
  active: boolean;
}

export interface PaginationInfo {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PatientsResponseDTO {
  content: PatientResponseDTO[];
  pageable: PaginationInfo;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
