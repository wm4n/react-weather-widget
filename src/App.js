import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import WeatherWidget from './components/WeatherWidget';
// mock data for testing without API call
// import testData from './testData.json';

const cities = [
  { city: 'taipei', label: '🇹🇼 台北' },
  { city: 'tokyo', label: '🇯🇵 東京' },
  { city: 'moscow', label: '🇷🇺 莫斯科' },
  { city: 'sydney', label: '🇦🇺 雪梨' },
  { city: 'london', label: '🇬🇧 倫敦' },
  { city: 'paris', label: '🇫🇷 巴黎' },
  { city: 'mexico', label: '🇲🇽 墨西哥' },
  { city: 'seattle', label: '🇺🇸 西雅圖' },
  { city: 'washington', label: '🇺🇸 華盛頓' },
  { city: 'beijing', label: '🇨🇳 北京' },
];

const App = () => {
  const params = new URLSearchParams(window.location.search);
  const city = params.get('city_index');

  const [cityIndex, setCityIndex] = useState(city || 0);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');

  const fetchWeatherAsync = async (cityId) => {
    try {
      const response = await axios.get(
        'https://api.openweathermap.org/data/2.5/forecast',
        {
          params: {
            q: cityId,
            lang: 'zh_tw',
            appid: 'open weather map key here',
            units: 'metric',
          },
        },
      );
      const transformData = await response.data.list.map((data) => ({
        dt: data.dt,
        temp: data.main.temp,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        humidity: data.main.humidity,
        icon: data.weather[0].icon,
        desc: data.weather[0].description,
        clouds: data.clouds.all,
        wind: data.wind.speed,
      }));
      setForecast(transformData);
    } catch (err) {
      setError(err.stack);
    }
  };

  useEffect(() => {
    fetchWeatherAsync(cities[cityIndex].city);
  }, []); // notice the empty array here

  return (
    <div className="App">
      {error.length === 0 ? (
        <WeatherWidget
          config={{
            location: cities[cityIndex].label,
            unit: 'metric',
            locale: 'zh-tw',
            onLocationClick: () => {
              if (cityIndex + 1 >= cities.length) {
                setCityIndex(0);
                fetchWeatherAsync(cities[0].city);
              } else {
                setCityIndex(cityIndex + 1);
                fetchWeatherAsync(cities[cityIndex + 1].city);
              }
            },
          }}
          forecast={forecast}
        />
      ) : (
        <div>
          <h2>Unable to fetch weather data!</h2>
          <pre>{error}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
