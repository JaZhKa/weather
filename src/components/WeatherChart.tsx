import { useState } from 'react';
import Tooltip from './Tooltip';
import ChartAxis from './ChartAxis';
import ChartBars from './ChartBars';
import DateLabels from './DateLabels';

interface WeatherData {
  dt: number;
  main: {
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

interface GroupedData {
  [key: string]: {
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    wind: number;
  };
}

interface Props {
  data: WeatherData[];
  dataType: string;
  granularity: string;
}

const WeatherChart: React.FC<Props> = ({ data, dataType, granularity }) => {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: string } | null>(null);

  const handleMouseEnter = (e: React.MouseEvent, content: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      x: rect.left,
      y: rect.bottom / 2,
      content,
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  const getDailyData = (data: WeatherData[]): GroupedData => {
    return data.reduce((acc: GroupedData, item) => {
      const date = new Date(item.dt * 1000).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { temp_min: item.main.temp_min, temp_max: item.main.temp_max, pressure: item.main.pressure, humidity: item.main.humidity, wind: item.wind.speed };
      } else {
        acc[date].temp_min = Math.min(acc[date].temp_min, item.main.temp_min);
        acc[date].temp_max = Math.max(acc[date].temp_max, item.main.temp_max);
        acc[date].pressure = Math.max(acc[date].pressure, item.main.pressure);
        acc[date].humidity = Math.max(acc[date].humidity, item.main.humidity);
        acc[date].wind = Math.max(acc[date].wind, item.wind.speed);
      }
      return acc;
    }, {});
  };

  const getThreeHourlyData = (data: WeatherData[]): GroupedData => {
    return data.reduce((acc: GroupedData, item) => {
      const date = new Date(item.dt * 1000);
      const hours = date.getHours();
      const dateString = date.toISOString().split('T')[0] + ' ' + Math.floor(hours / 3) * 3 + ':00';

      if (!acc[dateString]) {
        acc[dateString] = { temp_min: item.main.temp_min, temp_max: item.main.temp_max, pressure: item.main.pressure, humidity: item.main.humidity, wind: item.wind.speed };
      } else {
        acc[dateString].temp_min = Math.min(acc[dateString].temp_min, item.main.temp_min);
        acc[dateString].temp_max = Math.max(acc[dateString].temp_max, item.main.temp_max);
        acc[dateString].pressure = Math.max(acc[dateString].pressure, item.main.pressure);
        acc[dateString].humidity = Math.max(acc[dateString].humidity, item.main.humidity);
        acc[dateString].wind = Math.max(acc[dateString].wind, item.wind.speed);
      }
      return acc;
    }, {});
  };

  const groupedData: GroupedData | WeatherData[] = granularity === 'daily' ? getDailyData(data) : getThreeHourlyData(data);

  const dataArray: any[] = Array.isArray(groupedData) ? groupedData : Object.keys(groupedData)
    .map(date => ({
      date,
      ...groupedData[date]
    }))
    .slice(0, granularity === 'daily' ? 5 : 8); // Display 5 days for daily granularity and 8 intervals for 3-hour granularity

  let minVal, maxVal;
  switch (dataType) {
    case 'pressure':
      minVal = Math.min(...dataArray.map(item => Math.floor(item.pressure))) - 1;
      maxVal = Math.max(...dataArray.map(item => Math.ceil(item.pressure))) + 1;
      break;
    case 'humidity':
      minVal = Math.min(...dataArray.map(item => Math.floor(item.humidity))) - 1;
      maxVal = Math.max(...dataArray.map(item => Math.ceil(item.humidity))) + 1;
      break;
    case 'wind':
      minVal = Math.min(...dataArray.map(item => Math.floor(item.wind))) - 1;
      maxVal = Math.max(...dataArray.map(item => Math.ceil(item.wind))) + 1;
      break;
    default:
      minVal = Math.min(...dataArray.map(item => Math.floor(item.temp_min))) - 1;
      maxVal = Math.max(...dataArray.map(item => Math.ceil(item.temp_max))) + 1;
  }

  const valueRange = Array.from({ length: maxVal - minVal + 1 }, (_, i) => minVal + i);

  return (
    <div className="relative w-[80%] max-w-3xl mx-auto h-64">
      <div className="absolute left-0 top-0 h-full w-px bg-gray-800 z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gray-800 z-10"></div>

      <ChartAxis valueRange={valueRange} dataType={dataType} minVal={minVal} maxVal={maxVal} />

      <DateLabels dataArray={dataArray} granularity={granularity} />

      <ChartBars 
        dataArray={dataArray}
        dataType={dataType} 
        minVal={minVal} 
        maxVal={maxVal} 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave} 
      />

      {tooltip && (
        <Tooltip x={tooltip.x} y={tooltip.y} content={tooltip.content} />
      )}
    </div>
  );
};

export default WeatherChart;
