import { usePagination } from '@/hooks/usePagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useI18n } from 'next-localization';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  windowSize?: number;
  paginationButtonClasses?: string;
}

export const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  windowSize = 3,
  paginationButtonClasses = 'px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-400',
}: PaginationProps) => {
  const { totalPages, startPage, endPage, visiblePages } = usePagination({
    totalItems,
    currentPage,
    itemsPerPage,
    windowSize,
  });

  const { t } = useI18n();
  if (totalPages <= 1) return null;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mt-16 flex items-center justify-center space-x-2 text-sm md:space-x-3">
      {currentPage > 1 && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`${paginationButtonClasses} border-border hover:bg-foreground border hover:text-white`}
        >
          <span className="md:hidden">
            <ChevronLeft size={16} />
          </span>
          <span className="hidden tracking-[0.1em] uppercase md:block">
            {t('pagination_prev_btn_text') || 'Prev'}
          </span>
        </button>
      )}

      {startPage > 1 && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className={`${paginationButtonClasses} ${
              currentPage === 1
                ? 'bg-foreground text-white'
                : 'border-border hover:bg-foreground border hover:text-white'
            }`}
          >
            1
          </button>
          <span className="text-foreground-muted px-1">...</span>
        </>
      )}

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`${paginationButtonClasses} ${
            page === currentPage
              ? 'bg-foreground text-white'
              : 'border-border hover:bg-foreground border hover:text-white'
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          <span className="text-foreground-muted px-1">...</span>
          <button
            onClick={() => handlePageChange(totalPages)}
            className={`${paginationButtonClasses} ${
              currentPage === totalPages
                ? 'bg-foreground text-white'
                : 'border-border hover:bg-foreground border hover:text-white'
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      {currentPage < totalPages && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`${paginationButtonClasses} border-border hover:bg-foreground border hover:text-white`}
        >
          <span className="md:hidden">
            <ChevronRight size={16} />
          </span>
          <span className="hidden tracking-[0.1em] uppercase md:block">
            {t('pagination_next_btn_text') || 'Next'}
          </span>
        </button>
      )}
    </div>
  );
};
