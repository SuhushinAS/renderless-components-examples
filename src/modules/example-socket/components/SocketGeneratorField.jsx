import withSocket from "modules/centrifuge/hoc/withSocket.jsx";
import geoJSONData from 'modules/example-map/data/geo-json.json';
import React from 'react';

class SocketGeneratorField extends React.Component {
  /**
   * Значения свойств по-умолчанию.
   * https://facebook.github.io/react/docs/typechecking-with-proptypes.html
   */
  static defaultProps = {
    interval: 300,
  };

  state = {
    position: 0,
  };

  /**
   * Конструктор компонента.
   * @param {*} props Свойства переданые в компонент.
   * @return {undefined}
   */
  constructor(props) {
    super(props);
    this.coordinates = geoJSONData.Path.coordinates;
    this.length = this.coordinates.length;
    this.position = 0;
    this.tickBind = this.tick.bind(this);
  }

  tick() {
    if (this.state.position < this.length) {
      this.timeout = setTimeout(this.tickBind, this.props.interval);
      this.process(this.state.position);
      this.setState(this.setPosition);
    }
  }

  setPosition = (state) => ({
    ...state,
    position: state.position + 1,
  });

  /**
   * Вывести компонент.
   * @return {*} Представление.
   */
  render() {
    return (
      <div>
        <fieldset>
          <legend>Control</legend>
          <button onClick={this.handleStart}>Start</button>
          {' '}
          <button onClick={this.handlePause}>Pause</button>
          {' '}
          <button onClick={this.handleStop}>Stop</button>
        </fieldset>
        <fieldset>
          <legend>Current</legend>
          <textarea disabled value={JSON.stringify(this.coordinates[this.state.position])} />
        </fieldset>
      </div>
    );
  }

  handleStart = () => {
    this.tickBind();
  };

  handlePause = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  };

  handleStop = () => {
    this.handlePause();
    this.setState({position: 0});
    this.process(0);
  };

  process(position) {
    const point = this.coordinates[position];
    this.props.subscription.publish(point);
  }
}

export default withSocket(SocketGeneratorField);
