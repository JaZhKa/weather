import React from 'react';

interface Props {
  selectedDataType: string;
  onSelectDataType: (dataType: string) => void;
}

const DataSelector: React.FC<Props> = ({ selectedDataType, onSelectDataType }) => {
  const dataTypes = ['temperature', 'pressure', 'humidity', 'wind'];

  return (
    <div className="flex justify-center my-4">
      {dataTypes.map((dataType) => (
        <button
          key={dataType}
          className={`p-2 m-1 rounded-md ${selectedDataType === dataType ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 cursor-pointer'}`}
          onClick={() => onSelectDataType(dataType)}
        >
          {dataType.charAt(0).toUpperCase() + dataType.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default DataSelector;
