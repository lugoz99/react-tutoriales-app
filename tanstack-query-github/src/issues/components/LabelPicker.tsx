import { useQuery } from '@tanstack/react-query';

// await sleep(1500); // segundo y medio
export const LabelPicker = () => {
  const labelsQuery = useQuery({
    queryKey: ['labels'],
  });

  if (labelsQuery.isLoading) {
    return <div className="flex justify-center items-center h-52">loading...</div>;
  }

  return (
    <>
      <span
        className="px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer"
        style={{ border: `1px solid #ffccd3`, color: '#ffccd3' }}
      >
        Primary
      </span>
    </>
  );
};
