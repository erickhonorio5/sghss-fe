"use client";

import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, UserPlus, ArrowUpDown } from "lucide-react";
import toast from "react-hot-toast";
import { getPatients, getPatientByCpf } from "@/services/patientService";
import { usePatientsStore, SearchType } from "@/stores/patients-store";
import { FilterBar } from "./FilterBar";
import { PatientCard, SkeletonGrid } from "./PatientCard";
import { Pagination } from "./Pagination";
import { PatientModal } from "./PatientModal";

export const PatientsView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    patients,
    loading,
    searchTerm,
    searchType,
    filterActive,
    currentPage,
    totalPages,
    totalElements,
    sortField,
    sortDirection,
    isSearchingByCpf,
    setPatients,
    setLoading,
    setCurrentPage,
    setPaginationData,
    setSortField,
    setSortDirection,
    resetFilters,
    setSearchingByCpf
  } = usePatientsStore();

  const fetchPatients = useCallback(async () => {
    if (isSearchingByCpf) {
      setSearchingByCpf(false);
      return;
    }

    setLoading(true);
    try {
      let nameFilter, emailFilter, cpfFilter;

      if (searchTerm) {
        if (searchType === 'name') nameFilter = searchTerm;
        else if (searchType === 'email') emailFilter = searchTerm;
        else if (searchType === 'cpf') cpfFilter = searchTerm.replace(/\D/g, '');
      }

      const response = await getPatients(
        currentPage,
        10,
        `${sortField},${sortDirection}`,
        nameFilter || emailFilter || cpfFilter || undefined,
        filterActive !== null ? filterActive : undefined
      );

      setPatients(response.content);
      setPaginationData(response.totalPages, response.totalElements);
    } catch (error) {
      toast.error("Erro ao carregar pacientes. Tente novamente mais tarde.");
      console.error("Erro ao buscar pacientes:", error);
      setPatients([]);
      setPaginationData(0, 0);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, searchType, filterActive, currentPage, sortField, sortDirection, setLoading, setPatients, setPaginationData, isSearchingByCpf, setSearchingByCpf]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handleSearch = (e: React.FormEvent, searchType: SearchType) => {
    e.preventDefault();
    setCurrentPage(0);
    fetchPatients();
  };

  const handleSearchByCpf = async (cpf: string) => {
    setLoading(true);
    setSearchingByCpf(true);

    try {
      const cleanCpf = cpf.replace(/\D/g, '');
      const patient = await getPatientByCpf(cleanCpf);

      if (patient) {
        setPatients([patient]);
        setPaginationData(1, 1);
        toast.success(`Paciente encontrado: ${patient.name}`);
      }
    } catch (error: any) {
      const statusCode = error?.response?.status;

      if (statusCode === 404) {
        toast.error("Nenhum paciente encontrado com este CPF.");
        setPatients([]);
        setPaginationData(0, 0);
      } else {
        toast.error("Erro ao buscar paciente pelo CPF. Tente novamente mais tarde.");
        console.error("Erro na busca por CPF:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleResetFilters = () => {
    resetFilters();
    fetchPatients();
  };

  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center"
    >
      <div className="flex flex-col items-center justify-center py-12">
        <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-6 mb-4">
          <Search className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Nenhum paciente encontrado
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
          Não foi possível encontrar pacientes com os filtros selecionados. Tente mudar seus critérios de busca ou cadastre novos pacientes.
        </p>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={handleResetFilters}
            className="flex items-center"
          >
            <Search className="w-4 h-4 mr-2" />
            Limpar filtros
          </Button>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white flex items-center"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Novo Paciente
          </Button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pacientes</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {totalElements > 0 ? (
                <>Gerenciando <b>{totalElements}</b> pacientes cadastrados</>
              ) : (
                "Nenhum paciente encontrado"
              )}
            </p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white flex items-center space-x-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Novo Paciente</span>
          </Button>
        </div>

        <FilterBar
          onSearchSubmit={handleSearch}
          onResetFilters={handleResetFilters}
          searchByCpf={handleSearchByCpf}
        />
      </motion.div>

      {loading ? (
        <SkeletonGrid />
      ) : patients.length > 0 ? (
        <div>
          {!isSearchingByCpf && (
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary"
                >
                  Nome
                  <ArrowUpDown className={`w-3 h-3 ml-1 ${sortField === "name" ? "text-primary" : "text-gray-400"}`} />
                </button>
                <button
                  onClick={() => handleSort("birthDate")}
                  className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary"
                >
                  Data de Nascimento
                  <ArrowUpDown className={`w-3 h-3 ml-1 ${sortField === "birthDate" ? "text-primary" : "text-gray-400"}`} />
                </button>
              </div>
            </div>
          )}

          <AnimatePresence>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {patients.map((patient) => (
                <PatientCard key={patient.id} patient={patient} />
              ))}
            </div>
          </AnimatePresence>

          {!isSearchingByCpf && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      ) : (
        <EmptyState />
      )}

      <PatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => fetchPatients()}
      />
    </div>
  );
};
