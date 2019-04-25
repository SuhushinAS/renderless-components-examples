import Centrifuge from 'modules/centrifuge/components/Centrifuge.jsx';
import Subscribe from 'modules/centrifuge/components/Subscribe.jsx';
import React from 'react';
import connect from 'data/connect.json';
import geoJSON from 'data/geo-json.json';

const {coordinates} = geoJSON.Path;
const {length} = coordinates;

class SocketGenerator extends React.Component {
  static defaultProps = {
    interval: 550,
  };

  state = {
    length: 0,
    position: 0,
    isFollowPoint: false,
  };

  subscription;

  constructor(props) {
    super(props);
    this.eventData = {
      subscribe: this.handleSubscribe,
    };
    this.tickBind = this.tick.bind(this);
  }

  handlePause = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  };

  handleStart = () => {
    this.tickBind();
  };

  handleStop = () => {
    this.handlePause();
    this.setState({position: 0});
    this.process(0);
  };

  handleSubscribe = (subscription) => {
    this.subscription = subscription;
  };

  handleView = () => {
    this.setState(this.toggleView);
  };

  toggleView = (state) => {
    const isFollowPoint = !state.isFollowPoint;
    if (this.subscription) {
      this.subscription.publish({
        type: 'setView',
        isFollowPoint,
      });
    }
    return {
      ...state,
      isFollowPoint,
    }
  };

  setPosition = (state) => ({
    ...state,
    position: state.position + 1,
  });

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
          {' '}
          <button onClick={this.handleView}>View</button>
        </fieldset>
        <fieldset>
          <legend>Current</legend>
          <code>
            {JSON.stringify(coordinates[this.state.position])}
          </code>
        </fieldset>
        <Centrifuge {...connect}>
          <Subscribe channel="Userstory+DevPRO" eventData={this.eventData} />
        </Centrifuge>
      </div>
    );
  }

  tick() {
    const {position} = this.state;
    if (position < length) {
      this.timeout = setTimeout(this.tickBind, this.props.interval);
      this.process(position);
      this.setState(this.setPosition);
    }
  }

  process(position) {
    if (this.subscription) {
      const point = coordinates[position];
      this.subscription.publish({
        type: 'setPoint',
        point,
      });
    }
  }

  componentWillUnmount() {
    this.handleStop();
  }
}

export default SocketGenerator;
