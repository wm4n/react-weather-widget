// WeatherWidget Component

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import WeatherBannerTab from './WeatherBannerTab';
import MiniWeatherCard from './MiniWeatherCard';

class WeatherWidget extends React.Component {
  static renderEmpty() {
    return (
      <div>
        <h3>No forecast!? Check your props data!</h3>
      </div>
    );
  }
  constructor(props) {
    super(props);
    const { forecast } = props;
    if (forecast) {
      let firstMomentOfDay;
      let forecastOfDay = [];
      const forecastOfDayList = [];
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
      this.state = { forecastIdx: 0, forecastOfDayList };
    } else {
      this.state = {};
    }
  }

  render() {
    const { config, forecast } = this.props;
    if (!forecast) {
      return this.renderEmpty();
    }
    const forecastList = this.state.forecastOfDayList;
    return (
      <ContentContainer>
        <WeatherBannerTab
          className=""
          location={config.location}
          forecastOfDay={forecastList[this.state.forecastIdx]}
          unit={config.unit}
          locale={config.locale}
        />
        <Next5Container>
          <MiniWeatherCard
            onClick={() => this.setState({ forecastIdx: 0 })}
            forecastList={forecastList[0]}
            isSelected={this.state.forecastIdx === 0}
            unit={config.unit}
            locale={config.locale}
          />
          <MiniWeatherCard
            onClick={() => this.setState({ forecastIdx: 1 })}
            forecastList={forecastList[1]}
            isSelected={this.state.forecastIdx === 1}
            unit={config.unit}
            locale={config.locale}
          />
          <MiniWeatherCard
            onClick={() => this.setState({ forecastIdx: 2 })}
            forecastList={forecastList[2]}
            isSelected={this.state.forecastIdx === 2}
            unit={config.unit}
            locale={config.locale}
          />
          <MiniWeatherCard
            onClick={() => this.setState({ forecastIdx: 3 })}
            forecastList={forecastList[3]}
            isSelected={this.state.forecastIdx === 3}
            unit={config.unit}
            locale={config.locale}
          />
          <MiniWeatherCard
            onClick={() => this.setState({ forecastIdx: 4 })}
            forecastList={forecastList[4]}
            isSelected={this.state.forecastIdx === 4}
            unit={config.unit}
            locale={config.locale}
          />
        </Next5Container>
      </ContentContainer>
    );
  }
}

WeatherWidget.defaultProps = {
  config: PropTypes.arrayOf({
    unit: 'metric',
  }),
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
  ).isRequired,
  config: PropTypes.shape({
    location: PropTypes.string.isRequired,
    unit: PropTypes.string,
    locale: PropTypes.string,
  }).isRequired,
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
