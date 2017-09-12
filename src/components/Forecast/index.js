import React, { Component, PropTypes } from 'react';

class Forecast extends Component {

  render() {
    let url = `//forecast.io/embed/#lat=${this.props.latitude}&lon=${this.props.longitude}`;
    url += `&name=${this.props.name}&color=${this.props.color}&font=${this.props.font}`;
    url += `&units=${this.props.units}`;

    return React.createElement('iframe', {
      type: 'text/html',
      height: this.props.height,
      width: this.props.width,
      frameBorder: '0',
      src: url,
    });
  }
}

Forecast.defaultProps = {
  height: 245,
  width: '100%',
  name: '',
  color: '',
  font: '',
  units: '',
};


Forecast.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  name: PropTypes.string,
  color: PropTypes.string,
  font: PropTypes.string,
  units: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.string,
};

export default Forecast;
