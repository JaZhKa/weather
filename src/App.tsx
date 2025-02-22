import { useState } from 'react';
import SearchCity from './components/SearchCity';
import WeatherChart from './components/WeatherChart';
import DataSelector from './components/DataSelector';
import GranularitySelector from './components/GranularitySelector';
import { getWeatherForecast } from './api/weather';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [selectedDataType, setSelectedDataType] = useState('temperature');
  const [granularity, setGranularity] = useState('daily');

  const handleSearch = async (city: string) => {
    const data = await getWeatherForecast(city);
    setWeatherData(data.list);
  };

  return (
    <div className='container max-w-3xl mx-auto p-4'>
      <h1 className='text-2xl font-bold text-center mb-4'>Weather Forecast</h1>
      <SearchCity onSearch={handleSearch} />
      <DataSelector
        selectedDataType={selectedDataType}
        onSelectDataType={setSelectedDataType}
      />
      <GranularitySelector
        granularity={granularity}
        onSelectGranularity={setGranularity}
      />
      {weatherData.length > 0 && (
        <WeatherChart
          data={weatherData}
          dataType={selectedDataType}
          granularity={granularity}
        />
      )}
    </div>
  );
};

export default App;
