import {request} from "app/helpers.js";
import ExampleSocketMap
  from 'modules/example-socket/components/ExampleSocketMap.jsx';
import React from 'react';

class ExampleSocket extends React.Component {
  state = {
    connect: undefined,
    geoJSON: undefined,
    tile: undefined,
  };

  constructor(props) {
    super(props);
    this.load('connect', 'api/v1/connect');
    this.load('geoJSON', 'api/v1/geo-json');
    this.load('tile', 'api/v1/tile');
  }

  async load(key, url) {
    const data = await request(url);
    this.setState({[key]: data});
    return data;
  }

  render() {
    const {connect, geoJSON, tile} = this.state;
    if (connect && geoJSON && tile) {
      return (
        <ExampleSocketMap connect={connect} geoJSON={geoJSON} tile={tile.Stamen} />
      );
    }
    return null;
  }
}

export default ExampleSocket;
