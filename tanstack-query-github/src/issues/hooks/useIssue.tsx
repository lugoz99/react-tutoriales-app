import { useQuery } from '@tanstack/react-query';
import { getCommentsAction, getIssueAction } from '../actions';

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery({
    queryKey: ['issue', issueNumber],
    queryFn: () => getIssueAction(issueNumber),
    staleTime: 1000 * 60,
    // retry: false,
  });

  // const commentsQuery = useQuery({
  //   queryKey: ['issue', issueNumber, 'comments'],
  //   queryFn: () => getCommentsAction(issueNumber),
  //   staleTime: 1000 * 60,
  //   // retry: false,
  // });

  const commentsQuery = useQuery({
    queryKey: ['issue', issueQuery.data?.number, 'comments'],
    queryFn: () => getCommentsAction(issueQuery.data!.number),
    staleTime: 1000 * 60,
    // retry: false,
    enabled: issueQuery.data !== undefined,
  });
  return { issueQuery, commentsQuery };
};
