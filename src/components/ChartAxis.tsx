interface ChartAxisProps {
  valueRange: number[];
  dataType: string;
  minVal: number;
  maxVal: number;
}

const ChartAxis: React.FC<ChartAxisProps> = ({ valueRange, dataType, minVal, maxVal }) => (
  <>
    {valueRange.map((value, index) => (
      <div
        key={index}
        className="absolute left-0 w-full border-t border-gray-300"
        style={{
          bottom: `${((value - minVal) / (maxVal - minVal)) * 100}%`,
        }}
      >
        <span className="absolute -left-8 transform -translate-y-1/2 text-xs">
          {value} {dataType === 'pressure' ? 'hPa' : dataType === 'humidity' ? '%' : dataType === 'wind' ? 'm/s' : '°C'}
        </span>
      </div>
    ))}
  </>
);

export default ChartAxis;
