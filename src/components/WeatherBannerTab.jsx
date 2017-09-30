// WeatherBannerTab Component

import 'react-tabs/style/react-tabs.css';
import 'rc-slider/assets/index.css';

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import styled from 'styled-components';
import WeatherBanner from './WeatherBanner';

const Handle = Slider.Handle;

class WeatherBannerTab extends React.Component {
  static renderTabPanel(item, unit) {
    return (
      <TabPanel key={`tp${item.dt}`}>
        <WeatherBanner data={item} unit={unit} />
      </TabPanel>
    );
  }

  static renderTab(item, locale) {
    const localeRegion = locale || 'zh-tw';
    if (item) {
      return (
        <Tab key={`t${item.dt}`}>
          {moment
            .unix(item.dt)
            .locale(localeRegion)
            .format('a h:mm')}
        </Tab>
      );
    }
    return (<div />);
  }

  static getMarks() {}

  static handle(props) {
    const { value, dragging, index, ...restProps } = props;
    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={value}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </Tooltip>
    );
  }

  constructor(props) {
    super(props);
    const { location, forecastOfDay, locale } = props;
    this.marks = {};
    forecastOfDay.forEach((item, index) => {
      this.marks[index] = item.moment.locale(locale).format('a h:mm');
    });
    this.state = { location, forecastOfDay, tabIndex: 0, locale };
  }

  componentWillReceiveProps(nextProps) {
    const { location, forecastOfDay, locale } = nextProps;
    this.marks = {};
    forecastOfDay.forEach((item, index) => {
      this.marks[index] = item.moment.locale(locale).format('a h:mm');
    });
    this.setState({ location, forecastOfDay, tabIndex: 0, locale });
  }

  onSlided(e) {
    this.setState({ tabIndex: e });
  }

  render() {
    const { location, forecastOfDay, tabIndex } = this.state;
    return (
      <Container>
        <LocationText>{location}</LocationText>
        <Tabs selectedIndex={tabIndex} onSelect={false}>
          {forecastOfDay.map(item =>
            WeatherBannerTab.renderTabPanel(item, this.props.unit),
          )}
          <TabList style={{ display: 'none' }}>
            {forecastOfDay.map(item => WeatherBannerTab.renderTab(item))}
          </TabList>
        </Tabs>
        <TabContainer>
          <Slider
            min={0}
            max={forecastOfDay.length - 1}
            value={tabIndex}
            handle={this.handle}
            onChange={e => this.onSlided(e)}
            marks={this.marks}
          />
        </TabContainer>
      </Container>
    );
  }
}

WeatherBannerTab.defaultProps = {
  unit: 'metric',
  locale: 'zh-tw',
};

WeatherBannerTab.propTypes = {
  location: PropTypes.string.isRequired,
  forecastOfDay: PropTypes.arrayOf(
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
  unit: PropTypes.string,
  locale: PropTypes.string,
};

export default WeatherBannerTab;

const LocationText = styled.div`
  font-size: 2rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const TabContainer = styled.div`
  margin: 0.8rem 0.8rem;
  padding-bottom: 1.5rem;
`;
