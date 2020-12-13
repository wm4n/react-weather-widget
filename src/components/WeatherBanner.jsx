import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import iconCodeMapping from '../WeatherIcon';

/**
 * Render a primary display of the current forecast, including a date time, a weather icon,
 * current temperature, humidity, cloud density and wind
 *
 * @param {object} forecastNow the current forecast
 * @param {string} unit the unit format for figures, only accepting 'metric' for now
 * @param {locale} locale locale for time formating
 */
const WeatherBanner = ({ forecastNow, unit, locale }) => (
  <div>
    <h5>
      ${moment.unix(forecastNow.dt).locale(locale).format('dddd a h:mm')}, $
      {forecastNow.desc}
    </h5>
    <BannerContainer>
      <BannerIcon src={iconCodeMapping[forecastNow.icon]} />
      <Temperature>{Math.round(forecastNow.temp * 10) / 10}</Temperature>
      <Unit>
        &deg;
        {unit === 'metric' ? 'C' : 'F'}
      </Unit>
      <div style={{ flex: '1' }} />
      <DetailContainer>
        <InfoText>
          Clouds:
          <b>{forecastNow.clouds}%</b>
        </InfoText>
        <InfoText>
          Humidity: <b>{forecastNow.humidity}%</b>
        </InfoText>
        <InfoText>
          Wind:{' '}
          <b>
            {forecastNow.wind}
            {unit === 'metric' ? 'm/s' : 'mph'}
          </b>
        </InfoText>
      </DetailContainer>
    </BannerContainer>
  </div>
);

WeatherBanner.defaultProps = {
  unit: 'metric',
  locale: 'zh-tw',
};

WeatherBanner.propTypes = {
  forecastNow: PropTypes.shape({
    dt: PropTypes.number.isRequired,
    temp: PropTypes.number.isRequired,
    temp_min: PropTypes.number.isRequired,
    temp_max: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    clouds: PropTypes.number.isRequired,
    wind: PropTypes.number.isRequired,
  }).isRequired,
  unit: PropTypes.string,
  locale: PropTypes.string,
};

export default WeatherBanner;

const BannerContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const BannerIcon = styled.img`
  width: 5rem;
  height: 5rem;
`;

const Temperature = styled.div`
  font-size: 3rem;
  margin-left: 0.5rem;
  font-weight: bold;
`;

const Unit = styled.div`
  font-size: 1rem;
  margin-top: 0.7rem;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoText = styled.div`
  text-align: right;
`;
