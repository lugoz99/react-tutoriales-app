import { FC } from 'react';
import { LoadinSpinner } from '../../shared/components/LoadinSpinner';
import { useLabel } from '../hooks/useLabel';

// await sleep(1500); // segundo y medio

interface Props {
  selectedLabels: string[];
  onSelectedLabel: (label: string) => void;
}

export const LabelPicker: FC<Props> = ({ selectedLabels, onSelectedLabel }) => {
  const { labelsQuery } = useLabel();

  if (labelsQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-52">
        <LoadinSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 animate-fadeIn">
      {labelsQuery.data?.map((label) => (
        <span
          onClick={() => onSelectedLabel(label.name)}
          key={label.id}
          className={`px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer text-white
            ${selectedLabels.includes(label.name) ? 'selected-label' : ''}
          `}
          style={{ border: `1px solid #${label.color}` }}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
};
