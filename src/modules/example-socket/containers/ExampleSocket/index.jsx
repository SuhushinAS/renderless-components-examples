import Centrifuge from "modules/centrifuge/containers/Centrifuge/index.jsx";
import Subscribe from 'modules/centrifuge/containers/Subscribe/index.jsx';
import geoJSONData from 'modules/example-map/data/geo-json.json';
import tileLayerData from "modules/example-map/data/tile-layer.json";
import connectData from 'modules/example-socket/data/connect.json';
import Map from "modules/map/containers/Map/index.jsx";
import Marker from "modules/map/containers/Marker/index.jsx";
import TileLayer from "modules/map/containers/TileLayer/index.jsx";
import View from "modules/map/containers/View/index.jsx";
import React from 'react';

const geoJSONList = Object.keys(geoJSONData).map((id) => geoJSONData[id]);
const user = 'user';

class ExampleSocket extends React.Component {
  state = {};

  /**
   * Вывести компонент.
   * @return {*} Представление.
   */
  render() {
    return (
      <Centrifuge secret={connectData.secret} url={connectData.url} user={user}>
        <Map>
          <TileLayer {...tileLayerData.Stamen} />
          <View view={geoJSONList} />
          {this.renderPoint()}
        </Map>
        <Subscribe channel="test" onMessage={this.handleMessage} />
      </Centrifuge>
    );
  }

  renderPoint() {
    if (this.state.point) {
      return <Marker geoJSON={this.state.point} />;
    }
  }

  handleMessage = (point) => {
    this.setState({point});
  };
}

export default ExampleSocket;
