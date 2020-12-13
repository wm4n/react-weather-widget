import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import WeatherBannerTab from './WeatherBannerTab';
import MiniWeatherCard from './MiniWeatherCard';

const WeatherWidget = ({ config, forecast }) => {
  const [forecastIdx, setForecastIdx] = useState(0);

  if (forecast !== undefined && forecast.length > 0) {
    let firstMomentOfDay;
    let forecastOfDay = [];
    const forecastOfDayList = [];
    /* eslint-disable no-param-reassign */
    forecast.forEach((item, index) => {
      if (firstMomentOfDay === undefined) {
        firstMomentOfDay = moment.unix(item.dt);
        forecast[index].moment = firstMomentOfDay;
        forecastOfDay.push(item);
      } else {
        const currentMoment = moment.unix(item.dt);
        forecast[index].moment = currentMoment;
        if (firstMomentOfDay.isSame(currentMoment, 'day')) {
          forecastOfDay.push(item);
        } else {
          forecastOfDayList.push(forecastOfDay);
          forecastOfDay = [];
          forecastOfDay.push(item);
          firstMomentOfDay = currentMoment;
        }
      }
    });
    /* eslint-enable no-param-reassign */
    const forecastList = forecastOfDayList;
    return (
      <ContentContainer>
        <WeatherBannerTab
          className=""
          location={config.location}
          forecastOfDay={forecastList[forecastIdx]}
          unit={config.unit}
          locale={config.locale}
        />
        <Next5Container>
          <MiniWeatherCard
            onClick={() => setForecastIdx(0)}
            forecastList={forecastList[0]}
            isSelected={forecastIdx === 0}
            unit={config.unit}
            locale={config.locale}
          />
          <MiniWeatherCard
            onClick={() => setForecastIdx(1)}
            forecastList={forecastList[1]}
            isSelected={forecastIdx === 1}
            unit={config.unit}
            locale={config.locale}
          />
          <MiniWeatherCard
            onClick={() => setForecastIdx(2)}
            forecastList={forecastList[2]}
            isSelected={forecastIdx === 2}
            unit={config.unit}
            locale={config.locale}
          />
          <MiniWeatherCard
            onClick={() => setForecastIdx(3)}
            forecastList={forecastList[3]}
            isSelected={forecastIdx === 3}
            unit={config.unit}
            locale={config.locale}
          />
          <MiniWeatherCard
            onClick={() => setForecastIdx(4)}
            forecastList={forecastList[4]}
            isSelected={forecastIdx === 4}
            unit={config.unit}
            locale={config.locale}
          />
        </Next5Container>
      </ContentContainer>
    );
  }
  return (
    <div>
      <h3>No forecast data available!</h3>
    </div>
  );
};

WeatherWidget.defaultProps = {
  config: PropTypes.arrayOf({
    unit: 'metric',
  }),
  forecast: [],
};

WeatherWidget.propTypes = {
  forecast: PropTypes.arrayOf(
    PropTypes.shape({
      dt: PropTypes.number.isRequired,
      temp: PropTypes.number.isRequired,
      temp_min: PropTypes.number.isRequired,
      temp_max: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      icon: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      clouds: PropTypes.number.isRequired,
      wind: PropTypes.number.isRequired,
    }),
  ),
  config: PropTypes.shape({
    location: PropTypes.string.isRequired,
    unit: PropTypes.string,
    locale: PropTypes.string,
  }),
};

const ContentContainer = styled.div`
  display: block;
  margin: 10px 5px;
  text-align: left;
  border: 1px solid #dddddd;
  box-shadow: 3px 3px 3px #aaaaaa;
  padding: 1rem 1rem;
`;

const Next5Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  justify-content: space-around;
`;

export default WeatherWidget;
