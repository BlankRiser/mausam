export const InfoCard: React.FC<{
  name: string;
  value: string | number;
}> = ({ name, value }) => {
  return (
    <div className="px-4 py-2 rounded bg-neutral-100 dark:bg-neutral-800">
      <p className="text-xs text-neutral-500 dark:text-neutral-300">{name}</p>
      <span>{value}</span>
    </div>
  );
};
