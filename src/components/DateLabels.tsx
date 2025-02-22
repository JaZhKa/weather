import React from 'react';

interface DateLabelsProps {
  dataArray: any[];
  granularity: string;
}

const DateLabels: React.FC<DateLabelsProps> = ({ dataArray, granularity }) => (
  <div className="absolute bottom-0 left-1 w-full">
    {dataArray.map((item, index) => {
      const date = new Date(item.date);
      const formattedDate = granularity === 'daily'
        ? `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`
        : `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
      return (
        <span
          key={index}
          className="absolute text-xs"
          style={{
            left: `${(index / (dataArray.length - 1)) * 80 + 10}%`,
            transform: 'translateX(-50%)',
            bottom: '-20px',
          }}
        >
          {formattedDate}
        </span>
      );
    })}
  </div>
);

export default DateLabels;
