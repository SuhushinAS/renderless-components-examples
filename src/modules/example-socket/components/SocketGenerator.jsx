import {request} from "app/helpers.js";
import Centrifuge from 'modules/centrifuge/components/Centrifuge.jsx';
import Subscribe from 'modules/centrifuge/components/Subscribe.jsx';
import React from 'react';

class SocketGenerator extends React.Component {
  static defaultProps = {
    interval: 550,
  };

  state = {
    connect: undefined,
    coordinates: [],
    geoJSON: undefined,
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
    this.position = 0;
    this.tickBind = this.tick.bind(this);
    this.load('connect', 'api/v1/connect');
    this.loadGeoJSON();
  }

  async load(key, url) {
    const data = await request(url);
    this.setState({[key]: data});
    return data;
  }

  async loadGeoJSON() {
    const geoJSON = await this.load('geoJSON', 'api/v1/geo-json');
    const {coordinates} = geoJSON.Path;
    this.setState({
      coordinates,
      length: coordinates.length,
    });
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
    const {connect, coordinates, position} = this.state;
    if (connect && coordinates) {
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
              {JSON.stringify(coordinates[position])}
            </code>
          </fieldset>
          <Centrifuge {...connect}>
            <Subscribe channel="userstory+devpro" eventData={this.eventData} />
          </Centrifuge>
        </div>
      );
    }
    return null;
  }

  tick() {
    const {length, position} = this.state;
    if (position < length) {
      this.timeout = setTimeout(this.tickBind, this.props.interval);
      this.process(position);
      this.setState(this.setPosition);
    }
  }

  process(position) {
    if (this.subscription) {
      const point = this.state.coordinates[position];
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
