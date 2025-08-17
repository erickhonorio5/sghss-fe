import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw, Filter } from "lucide-react";
// Removendo a importação do componente Select temporariamente
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } from "@/components/ui/select";
import { formatCPF } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { usePatientsStore, SearchType } from "@/stores/patients-store";

interface FilterBarProps {
  onSearchSubmit: (e: FormEvent, searchType: SearchType) => void;
  onResetFilters: () => void;
  searchByCpf?: (cpf: string) => void;
}

export const FilterBar = ({
  onSearchSubmit,
  onResetFilters,
  searchByCpf,
}: FilterBarProps) => {
  const {
    searchTerm,
    searchType,
    filterActive,
    validationError,
    setSearchTerm,
    setSearchType,
    setFilterActive,
    validateSearch
  } = usePatientsStore();

  const handleSearchChange = (value: string) => {
    if (searchType === 'cpf' && value) {
      const cleanValue = value.replace(/\D/g, '');
      const formattedValue = formatCPF(cleanValue);
      setSearchTerm(formattedValue);
      return;
    }

    setSearchTerm(value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateSearch()) {
      return;
    }

    if (searchType === 'cpf' && searchByCpf && searchTerm.replace(/\D/g, '').length === 11) {
      searchByCpf(searchTerm);
    } else {
      onSearchSubmit(e, searchType);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-2">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="md:w-36">
              {/* Substituindo temporariamente o componente Select por um select HTML nativo */}
              <select
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as SearchType)}
              >
                <option value="name">Nome</option>
                <option value="cpf">CPF</option>
                <option value="email">Email</option>
              </select>
            </div>

            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
              <Input
                type="search"
                placeholder={
                  searchType === 'name' ? "Buscar por nome..." :
                    searchType === 'cpf' ? "Digite o CPF..." :
                      "Digite o email..."
                }
                className={cn(
                  "pl-10 w-full",
                  validationError && "border-red-500 focus-visible:ring-red-500"
                )}
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <Button
                type="submit"
                className="absolute right-0 top-0 h-full rounded-l-none"
                disabled={!!validationError}
              >
                <Search className="w-4 h-4" />
                <span className="sr-only">Buscar</span>
              </Button>
            </div>
          </div>

          {validationError && (
            <p className="text-sm text-red-500">{validationError}</p>
          )}
          {searchType === 'cpf' && !validationError && searchTerm && (
            <p className="text-xs text-gray-500">
              Digite o CPF completo (11 dígitos) para busca direta
            </p>
          )}
        </form>

        <div className="flex space-x-2">
          <div className="flex rounded-md shadow-sm">
            <Button
              type="button"
              variant={filterActive === true ? "default" : "outline"}
              onClick={() => setFilterActive(filterActive === true ? null : true)}
              className={filterActive === true ? "bg-green-600 hover:bg-green-700" : ""}
            >
              Ativos
            </Button>
            <Button
              type="button"
              variant={filterActive === false ? "default" : "outline"}
              onClick={() => setFilterActive(filterActive === false ? null : false)}
              className={filterActive === false ? "bg-red-600 hover:bg-red-700" : ""}
            >
              Inativos
            </Button>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={onResetFilters}
            className="flex items-center"
            title="Limpar filtros"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {(searchTerm || filterActive !== null) && (
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex items-center flex-wrap">
          <Filter className="w-3 h-3 mr-2" />
          <span>Filtros aplicados:</span>
          {searchTerm && (
            <span className="ml-2">
              • {searchType === 'name' ? 'Nome' : searchType === 'cpf' ? 'CPF' : 'Email'}: "{searchTerm}"
            </span>
          )}
          {filterActive !== null && (
            <span className="ml-2">
              • Status: {filterActive ? "Ativos" : "Inativos"}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
