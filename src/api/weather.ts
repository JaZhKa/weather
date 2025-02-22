import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getWeatherForecast = async (city: string) => {
  const geocodingResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`);
  const { lat, lon } = geocodingResponse.data[0];
  const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
  return weatherResponse.data;
};
