import geoJSONData from 'modules/example-map/data/geo-json.json';
import tileLayerData from "modules/example-map/data/tile-layer.json";
import ExampleSocketMain
  from "modules/example-socket/components/ExampleSocketMain.jsx";
import connectData from 'modules/example-socket/data/connect.json';
import Marker from "modules/map/components/Marker.jsx";
import React from 'react';

const geoJSONList = Object.keys(geoJSONData).map((id) => geoJSONData[id]);

class ExampleSocket extends React.Component {
  static defaultProps = {
    user: 'user',
  };

  state = {};

  handleMessage = (message) => {
    this.setState({point: message.data});
  };

  eventData = {
    message: this.handleMessage,
  };

  render() {
    return (
      <ExampleSocketMain
        connectData={connectData}
        geoJSONList={geoJSONList}
        tileLayer={tileLayerData.Stamen}
      />
    );
  }

  renderPoint() {
    if (this.state.point) {
      return <Marker point={this.state.point} />;
    }
  }
}

export default ExampleSocket;
