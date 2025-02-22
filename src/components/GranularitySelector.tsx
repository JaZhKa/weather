interface Props {
  granularity: string;
  onSelectGranularity: (granularity: string) => void;
}

const GranularitySelector: React.FC<Props> = ({
  granularity,
  onSelectGranularity,
}) => {
  const options = ['3 hours', 'daily'];

  return (
    <div className='flex justify-center my-4'>
      {options.map((option) => (
        <button
          key={option}
          className={`p-2 m-1 rounded-md ${
            granularity === option
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300 cursor-pointer'
          }`}
          onClick={() => onSelectGranularity(option)}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default GranularitySelector;
