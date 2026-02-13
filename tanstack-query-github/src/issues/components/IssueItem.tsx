import { FiInfo, FiMessageSquare } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { GithubIssue, State } from '../interfaces';
import { useQueryClient } from '@tanstack/react-query';
import { getIssueAction } from '../actions/get-issue.action';
import { getCommentsAction } from '../actions';
import { timeSince } from '../../helpers';

interface Props {
  issue: GithubIssue;
}

export const IssueItem = ({ issue }: Props) => {
  const navigate = useNavigate();
  const queryclient = useQueryClient();
  const prefetchData = () => {
    queryclient.prefetchQuery({
      queryKey: ['issue', issue.number],
      queryFn: () => getIssueAction(issue.number),
      staleTime: 1000 * 60,
    });
    queryclient.prefetchQuery({
      queryKey: ['issue', issue.number, 'comments'],
      queryFn: () => getCommentsAction(issue.number),
      staleTime: 1000 * 60,
    });
  };
  const presetData = () => {
    queryclient.setQueryData(['issue', issue.number], issue, {
      updatedAt: Date.now() + 1000 * 60, // que tanto se considera como fresh
    });
  };

  return (
    <div
      // onMouseEnter={prefetchData}
      onMouseEnter={presetData}
      className="flex items-center px-2 py-3 mb-5 border rounded-md bg-slate-900 hover:bg-slate-800 animate-fadeIn"
    >
      {/* <FiCheckCircle size={30} color="green" /> */}
      {issue.state === State.Close ? (
        <FiInfo size={30} color="green" className="min-w-10" />
      ) : (
        <FiInfo size={30} color="red" className="min-w-10" />
      )}

      <div className="flex flex-col flex-grow px-2">
        <a onClick={() => navigate(`/issues/issue/${issue.number}`)} className="hover:underline">
          {issue.title}
        </a>
        <span className="text-gray-500">
          #${issue.number} opened {timeSince(issue.created_at)} ago by {''}
          <span className="font-bold">{issue.user.login}</span>
        </span>

        <div className="flex flex-wrap">
          {issue.labels.map((label) => (
            <span
              style={{
                border: `1px solid #${label.color}`,
              }}
              className="px-3 mr-2 mt-1 py-2 text-xs text-white rounded-md"
              key={label.id}
            >
              {label.name}
            </span>
          ))}
        </div>
      </div>

      <img src={issue.user.avatar_url} alt="User Avatar" className="w-8 h-8 rounded-full" />
      <div className="flex flex-col mx-2 items-center">
        <FiMessageSquare size={30} className="min-w-5" color="gray" />
        <span className="px-4 text-gray-400">{issue.comments}</span>
      </div>
    </div>
  );
};
