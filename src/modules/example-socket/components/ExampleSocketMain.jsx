import Centrifuge from "modules/centrifuge/components/Centrifuge.jsx";
import Subscribe from 'modules/centrifuge/components/Subscribe.jsx';
import Map from "modules/map/components/Map.jsx";
import Marker from "modules/map/components/Marker.jsx";
import TileLayer from "modules/map/components/TileLayer.jsx";
import View from "modules/map/components/View.jsx";
import React from 'react';

class ExampleSocketMain extends React.Component {
  state = {};

  eventData = {
    message: (message) => {
      this.setState({point: message.data});
    },
  };

  render() {
    const {connectData, geoJSONList, tileLayer} = this.props;
    return (
      <Centrifuge
        secret={connectData.secret}
        url={connectData.url}
        user={connectData.user}
      >
        <Map>
          <TileLayer params={tileLayer.params} url={tileLayer.url} />
          <View view={this.state.point} />
          {this.renderPoint()}
        </Map>
        <Subscribe channel="userstory-at-devpro" eventData={this.eventData} />
      </Centrifuge>
    );
  }

  renderPoint() {
    return <Marker point={this.state.point} />;
  }
}

export default ExampleSocketMain;
