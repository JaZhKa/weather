interface ChartBarsProps {
  dataArray: any[];
  dataType: string;
  minVal: number;
  maxVal: number;
  onMouseEnter: (e: React.MouseEvent, content: string) => void;
  onMouseLeave: () => void;
}

const ChartBars: React.FC<ChartBarsProps> = ({
  dataArray,
  dataType,
  minVal,
  maxVal,
  onMouseEnter,
  onMouseLeave,
}) => (
  <>
    {dataArray.map((item, index) => (
      <div
        key={index}
        className={`absolute bg-linear-0 from-blue-300 to-orange-300 ${
          dataType === 'temperature' ? 'w-8' : 'w-2'
        }`}
        style={{
          height: `${Math.max(
            ((item[
              dataType === 'pressure'
                ? 'pressure'
                : dataType === 'humidity'
                ? 'humidity'
                : dataType === 'wind'
                ? 'wind'
                : 'temp_max'
            ] -
              item[
                dataType === 'pressure'
                  ? 'pressure'
                  : dataType === 'humidity'
                  ? 'humidity'
                  : dataType === 'wind'
                  ? 'wind'
                  : 'temp_min'
              ]) /
              (maxVal - minVal)) *
              100,
            2
          )}%`,
          bottom: `${
            ((item[
              dataType === 'pressure'
                ? 'pressure'
                : dataType === 'humidity'
                ? 'humidity'
                : dataType === 'wind'
                ? 'wind'
                : 'temp_min'
            ] -
              minVal) /
              (maxVal - minVal)) *
            100
          }%`,
          left: `${(index / (dataArray.length - 1)) * 80 + 10}%`,
          transform: 'translateX(-50%)',
        }}
        onMouseEnter={(e) =>
          onMouseEnter(
            e,
            `Date: ${item.date}, Min Temp: ${item.temp_min}°C, Max Temp: ${item.temp_max}°C, Pressure: ${item.pressure} hPa, Humidity: ${item.humidity}%, Wind: ${item.wind} m/s`
          )
        }
        onMouseLeave={onMouseLeave}
      ></div>
    ))}
  </>
);

export default ChartBars;
