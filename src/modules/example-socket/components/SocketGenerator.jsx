import Centrifuge from 'modules/centrifuge/components/Centrifuge.jsx';
import Subscribe from 'modules/centrifuge/components/Subscribe.jsx';
import geoJSONData from 'modules/example-map/data/geo-json.json';
import connectData from 'modules/example-socket/data/connect.json';
import React from 'react';

class SocketGenerator extends React.Component {
  static defaultProps = {
    interval: 550,
    user: 'user',
  };

  state = {
    position: 0,
    isFollowPoint: false,
  };

  subscription;

  constructor(props) {
    super(props);
    this.coordinates = geoJSONData.Path.coordinates;
    this.eventData = {
      subscribe: this.handleSubscribe,
    };
    this.length = this.coordinates.length;
    this.position = 0;
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
          <code>{JSON.stringify(this.coordinates[this.state.position])}</code>
        </fieldset>
        <Centrifuge
          secret={connectData.secret}
          url={connectData.url}
          user={this.props.user}
        >
          <Subscribe
            channel="userstory-at-devpro"
            eventData={this.eventData}
          />
        </Centrifuge>
      </div>
    );
  }

  tick() {
    if (this.state.position < this.length) {
      this.timeout = setTimeout(this.tickBind, this.props.interval);
      this.process(this.state.position);
      this.setState(this.setPosition);
    }
  }

  process(position) {
    if (this.subscription) {
      const point = this.coordinates[position];
      this.subscription.publish({
        type: 'setPoint',
        point,
      });
    }
  }
}

export default SocketGenerator;
