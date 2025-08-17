import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-8">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(0, currentPage - 1))}
          disabled={currentPage === 0}
          className="flex items-center"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="sr-only">Anterior</span>
        </Button>

        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          // Lógica para mostrar páginas relevantes quando há muitas
          let pageToShow;
          if (totalPages <= 5) {
            pageToShow = i;
          } else {
            if (currentPage < 3) {
              pageToShow = i;
            } else if (currentPage > totalPages - 3) {
              pageToShow = totalPages - 5 + i;
            } else {
              pageToShow = currentPage - 2 + i;
            }
          }

          return (
            <Button
              key={pageToShow}
              variant={currentPage === pageToShow ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(pageToShow)}
              className={currentPage === pageToShow ? "bg-primary" : ""}
            >
              {pageToShow + 1}
            </Button>
          );
        })}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
          disabled={currentPage === totalPages - 1}
          className="flex items-center"
        >
          <ChevronRight className="w-4 h-4" />
          <span className="sr-only">Próxima</span>
        </Button>
      </div>
    </div>
  );
};
