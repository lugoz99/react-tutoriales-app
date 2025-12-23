import { useQuery } from '@tanstack/react-query';
import { getHeroesByPageAction } from '../actions/get-heroes-by-page.actions';

export const usePaginationHero = (page: number, limit: number, category = 'all') => {
  return useQuery({
    queryKey: ['heroes', { page, limit, category }],
    // queryFn: () => getHeroesByPageAction, como no se ocupa mandar nigun argument puede ir sin parentensis
    queryFn: () => getHeroesByPageAction(+page, +limit, category),
    staleTime: 1000 * 60 * 5, // cuanto tiene de fresca la peticion | evitar peticiones en cada momento
  });
};
