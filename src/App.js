import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import WeatherWidget from './components/WeatherWidget';
// mock data for testing without API call
// import testData from './testData.json';

const App = () => {
  const params = new URLSearchParams(window.location.search);
  const city = params.get('city');

  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.openweathermap.org/data/2.5/forecast', {
        params: {
          q: city,
          lang: 'zh_tw',
          appid: 'a9a128fe49257140db578a429168289a',
          units: 'metric',
        },
      })
      .then((response) => {
        const transformData = response.data.list.map((data) => ({
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
      })
      .catch(() => {})
      .then(() => {
        // always executed
      });
  }, []); // notice the empty array here

  return (
    <div className="App">
      <WeatherWidget
        config={{ location: city, unit: 'metric', locale: 'zh-tw' }}
        forecast={forecast}
      />
    </div>
  );
};

export default App;
