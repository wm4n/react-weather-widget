// WeatherBanner Component

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import iconCodeMapping from '../WeatherIcon';

class WeatherBanner extends React.Component {
  constructor(props) {
    super(props);
    this.data = props.data;
    this.unit = props.unit;
    this.locale = props.locale;
  }

  render() {
    const data = this.data;
    const unit = this.unit;
    const locale = this.locale;
    return (
      <div>
        <h5>{`${moment
          .unix(data.dt)
          .locale(locale)
          .format('dddd a h:mm')}, ${data.desc}`}</h5>
        <BannerContainer>
          <BannerIcon src={iconCodeMapping[data.icon]} />
          <Temperature>{Math.round(data.temp * 10) / 10}</Temperature>
          <Unit>&deg;{unit === 'metric' ? 'C' : 'F'}</Unit>
          <div style={{ flex: '1' }} />
          <DetailContainer>
            <InfoText>
              Clouds: <b>{data.clouds}%</b>
            </InfoText>
            <InfoText>
              Humidity: <b>{data.humidity}%</b>
            </InfoText>
            <InfoText>
              Wind:{' '}
              <b>
                {data.wind}
                {unit === 'metric' ? 'm/s' : 'mph'}
              </b>
            </InfoText>
          </DetailContainer>
        </BannerContainer>
      </div>
    );
  }
}

WeatherBanner.defaultProps = {
  unit: 'metric',
  locale: 'en-us',
};

WeatherBanner.propTypes = {
  data: PropTypes.shape({
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

const InfoText = styled.div`text-align: right;`;
