import Centrifuge from "modules/centrifuge/components/Centrifuge.jsx";
import Subscribe from 'modules/centrifuge/components/Subscribe.jsx';
import geoJSONData from 'modules/example-map/data/geo-json.json';
import tileLayerData from "modules/example-map/data/tile-layer.json";
import connectData from 'modules/example-socket/data/connect.json';
import Map from "modules/map/components/Map.jsx";
import Marker from "modules/map/components/Marker.jsx";
import TileLayer from "modules/map/components/TileLayer.jsx";
import View from "modules/map/components/View.jsx";
import React from 'react';

const geoJSONList = Object.keys(geoJSONData).map((id) => geoJSONData[id]);

class ExampleSocket extends React.Component {
  /**
   * Значения свойств по-умолчанию.
   * https://facebook.github.io/react/docs/typechecking-with-proptypes.html
   */
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

  /**
   * Вывести компонент.
   * @return {*} Представление.
   */
  render() {
    return (
      <Centrifuge secret={connectData.secret} url={connectData.url} user={this.props.user}>
        <Map>
          <TileLayer {...tileLayerData.Stamen} />
          <View view={geoJSONList} />
          {this.renderPoint()}
        </Map>
        <Subscribe channel="userstory-to-devpro" eventData={this.eventData} />
      </Centrifuge>
    );
  }

  renderPoint() {
    if (this.state.point) {
      return <Marker point={this.state.point} />;
    }
  }
}

export default ExampleSocket;
