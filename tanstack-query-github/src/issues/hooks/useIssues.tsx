import { useQuery } from '@tanstack/react-query';
import { getIssuesAction } from '../actions';
import { State } from '../interfaces';
import { useEffect, useState } from 'react';

interface Props {
  state: State;
  selectedLabels: string[];
}

export const useIssues = ({ state, selectedLabels }: Props) => {
  const [page, setPage] = useState(1);
  const issuesQuery = useQuery({
    queryKey: ['issues', { state, selectedLabels, page }], /// si la posicion no importa enviarlo como objeto { x: * properties }
    queryFn: () => getIssuesAction(state, selectedLabels, page),
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    setPage(1);
  }, [state]);

  useEffect(() => {
    setPage(1);
  }, [selectedLabels]);

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) {
      return;
    }

    setPage(page + 1);
  };

  const previousPage = () => {
    if (page === 1) return;
    setPage((prevPage) => prevPage - 1);
  };

  return {
    issuesQuery,
    // getters
    page,
    //actions
    previousPage,
    nextPage,
  };
};
