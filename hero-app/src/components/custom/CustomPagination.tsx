import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useSearchParams } from 'react-router';

interface Props {
  totalPages: number;
}

export const CustomPagination = ({ totalPages }: Props) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const queryPage = searchParam.get('page') ?? '1';

  const handleChangePageNumber = (page: number) => {
    if (page < 1 || page > totalPages) return;

    searchParam.set('page', page.toString());
    setSearchParam(searchParam);
  };
  const page = isNaN(+queryPage) ? 1 : Number(queryPage);
  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        onClick={() => handleChangePageNumber(page - 1)}
        variant="outline"
        size="sm"
        disabled={page === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        Anteriores
      </Button>

      {/* Logica
       * map callback , valor arreglo udenfiniend osea no sirve, pero index si sirve
       *
       */}
      {Array.from({ length: totalPages }).map((_, index) => (
        <Button
          onClick={() => handleChangePageNumber(page + 1)}
          key={index}
          variant={page === index + 1 ? 'default' : 'outline'}
          size="sm"
        >
          {index + 1}
        </Button>
      ))}

      {/* <Button variant="outline" size="sm">
        2
      </Button> */}
      {/* 
      <Button variant="ghost" size="sm" disabled>
        <MoreHorizontal className="h-4 w-4" />
      </Button> */}

      <Button
        onClick={() => handleChangePageNumber(page + 1)}
        variant="outline"
        size="sm"
        disabled={page === totalPages}
      >
        Siguientes
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
