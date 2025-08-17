import { motion } from "framer-motion";
import { format } from "date-fns";
import { PatientResponseDTO } from "@/types/patient";
import { Button } from "@/components/ui/button";
import { ptBR } from "date-fns/locale";
import {
  Calendar,
  Phone,
  Mail,
  MapPin,
  Shield,
  CheckCircle2,
  XCircle,
  FileEdit,
  Eye,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { formatCPF, formatPhone } from "@/lib/formatters";

const formatDate = (date: string): string => {
  if (!date) return "";
  return format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
};

// Componente de card para cada paciente
export const PatientCard = ({ patient }: { patient: PatientResponseDTO }) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{patient.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{formatCPF(patient.cpf)}</p>
          </div>
          <div>
            {patient.active ? (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Ativo
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                <XCircle className="w-3 h-3 mr-1" />
                Inativo
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{patient.email}</span>
          </div>
          <div className="flex items-center">
            <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{formatPhone(patient.phone)}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{formatDate(patient.birthDate)}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {patient.address.city}, {patient.address.state}
            </span>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md mb-4">
          <div className="flex items-start">
            <Shield className="w-4 h-4 text-blue-500 dark:text-blue-400 mr-2 mt-0.5" />
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400 block">Plano de Saúde</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{patient.insurance.name}</span>
              <div className="flex text-xs text-gray-500 dark:text-gray-400 mt-1 space-x-2">
                <span>Nº {patient.insurance.number}</span>
                <span>•</span>
                <span>Validade: {format(new Date(patient.insurance.expiryDate), "MM/yyyy")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/dashboard/patients/${patient.id}`)}
            className="flex items-center"
          >
            <Eye className="w-4 h-4 mr-1" />
            Detalhes
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/dashboard/patients/${patient.id}/edit`)}
            className="flex items-center text-blue-600 dark:text-blue-500 border-blue-600 dark:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            <FileEdit className="w-4 h-4 mr-1" />
            Editar
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Componente de loading skeleton
export const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
    <div className="p-5">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
        </div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md mb-4">
        <div className="h-12 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
      </div>

      <div className="flex justify-end space-x-2">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
      </div>
    </div>
  </div>
);

// Grid de skeletons
export const SkeletonGrid = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {Array.from({ length: 6 }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>
);
