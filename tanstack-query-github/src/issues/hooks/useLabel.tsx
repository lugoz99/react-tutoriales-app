import { getAllLabels } from '../actions/get-labels';
import { useQuery } from '@tanstack/react-query';

export const useLabel = () => {
  const labelsQuery = useQuery({
    queryKey: ['labels'],
    queryFn: getAllLabels,
    staleTime: 1000 * 60 * 60, // 1 hr
    // placeholderData: [
    //   // mientras cargue la info pon esto
    //   {
    //     id: 791921801,
    //     node_id: 'MDU6TGFiZWw3OTE5MjE4MDE=',
    //     url: 'https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F',
    //     name: '❤️',
    //     color: 'ffffff',
    //     default: false,
    //   } satisfies GithubLabel,
    //   {
    //     id: 739777675,
    //     node_id: 'MDU6TGFiZWw3Mzk3Nzc2NzU=',
    //     url: 'https://api.github.com/repos/facebook/react/labels/Component:%20Component%20API',
    //     name: 'Component: Component API',
    //     color: 'd4c5f9',
    //     default: false,
    //     description: null,
    //   } satisfies GithubLabel, // esto por si la informacion no cambia tanto
    // ],
    //initialData: [], // es otra forma de tener preparados datos , se considera fresca hasta el que se termine el statime
  });

  return {
    labelsQuery,
  };
};
