import { create } from "zustand";
import { PatientResponseDTO } from "@/types/patient";

export type SearchType = 'name' | 'cpf' | 'email';

interface PatientsState {
  // Dados
  patients: PatientResponseDTO[];
  loading: boolean;

  // Paginação e ordenação
  currentPage: number;
  totalPages: number;
  totalElements: number;
  sortField: string;
  sortDirection: "asc" | "desc";

  // Filtros
  searchTerm: string;
  searchType: SearchType;
  filterActive: boolean | null;
  validationError: string | null;
  isSearchingByCpf: boolean;

  // Ações para dados
  setPatients: (patients: PatientResponseDTO[]) => void;
  setLoading: (loading: boolean) => void;
  setPaginationData: (totalPages: number, totalElements: number) => void;

  // Ações para filtros
  setSearchTerm: (term: string) => void;
  setSearchType: (type: SearchType) => void;
  setFilterActive: (active: boolean | null) => void;
  setValidationError: (error: string | null) => void;
  setSearchingByCpf: (isSearching: boolean) => void;

  // Ações para paginação e ordenação
  setCurrentPage: (page: number) => void;
  setSortField: (field: string) => void;
  setSortDirection: (direction: "asc" | "desc") => void;

  // Ações compostas
  resetFilters: () => void;
  validateSearch: () => boolean;
}

export const usePatientsStore = create<PatientsState>((set, get) => ({
  // Estado inicial
  patients: [],
  loading: true,
  searchTerm: "",
  searchType: "name",
  filterActive: null,
  currentPage: 0,
  totalPages: 0,
  totalElements: 0,
  sortField: "name",
  sortDirection: "asc",
  validationError: null,
  isSearchingByCpf: false,

  // Setters para dados
  setPatients: (patients) => set({ patients }),
  setLoading: (loading) => set({ loading }),
  setPaginationData: (totalPages, totalElements) => set({ totalPages, totalElements }),

  // Setters para filtros
  setSearchTerm: (searchTerm) => {
    // Limpar erro de validação ao alterar o termo de busca
    set({ validationError: null });

    const state = get();
    // Aplicar formatação se for CPF
    if (state.searchType === 'cpf' && searchTerm) {
      const cleanValue = searchTerm.replace(/\D/g, '');
      // Deixamos a formatação para a biblioteca formatCPF que já existe
      // Aqui apenas salvamos o valor
      set({ searchTerm });
      return;
    }

    set({ searchTerm });
  },
  setSearchType: (searchType) => set({
    searchType,
    searchTerm: "",
    validationError: null
  }),
  setFilterActive: (filterActive) => set({ filterActive, currentPage: 0 }),
  setValidationError: (validationError) => set({ validationError }),
  setSearchingByCpf: (isSearchingByCpf) => set({ isSearchingByCpf }),

  // Setters para paginação e ordenação
  setCurrentPage: (currentPage) => set({ currentPage }),
  setSortField: (sortField) => set({ sortField, currentPage: 0 }),
  setSortDirection: (sortDirection) => set({ sortDirection, currentPage: 0 }),

  // Ações compostas
  resetFilters: () => set({
    searchTerm: "",
    searchType: "name",
    filterActive: null,
    sortField: "name",
    sortDirection: "asc",
    currentPage: 0,
    validationError: null,
    isSearchingByCpf: false
  }),

  validateSearch: () => {
    const { searchTerm, searchType } = get();

    // Busca vazia é válida (retorna todos)
    if (!searchTerm.trim()) {
      set({ validationError: null });
      return true;
    }

    // Validar CPF - deve ter 11 dígitos após remover formatação
    if (searchType === 'cpf') {
      const cleanCpf = searchTerm.replace(/\D/g, '');
      if (cleanCpf.length !== 11) {
        set({ validationError: 'CPF deve conter 11 dígitos' });
        return false;
      }
    }

    // Validar email - formato básico
    if (searchType === 'email' && !searchTerm.includes('@')) {
      set({ validationError: 'E-mail inválido' });
      return false;
    }

    set({ validationError: null });
    return true;
  }
}));
