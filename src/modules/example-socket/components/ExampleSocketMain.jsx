import Centrifuge from 'modules/centrifuge/components/Centrifuge.jsx';
import Subscribe from 'modules/centrifuge/components/Subscribe.jsx';
import KeyHandler from "modules/common/components/KeyHandler.jsx";
import geoJSONData from "modules/example-map/data/geo-json.json";
import Map from 'modules/map/components/Map.jsx';
import Marker from 'modules/map/components/Marker.jsx';
import TileLayer from 'modules/map/components/TileLayer.jsx';
import View from 'modules/map/components/View.jsx';
import React from 'react';

class ExampleSocketMain extends React.Component {
  state = {
    isFollowPoint: false,
  };

  eventData = {
    message: (message) => {
      switch (message.data.type) {
        case 'setPoint':
          this.setState({point: message.data.point});
          break;
        case 'setView':
          this.setState(this.toggleViewType);
          break;
        default:
          break;
      }
    },
  };

  toggleViewType = (state) => ({
    ...state,
    isFollowPoint: !state.isFollowPoint,
  });

  get geoJSON() {
    const {point} = this.state
    if (point) {
      return {
        coordinates: point,
        type: 'Point',
      };
    }
    return undefined;
  }

  render() {
    const {connectData, tileLayer} = this.props;
    return (
      <Centrifuge
        secret={connectData.secret}
        url={connectData.url}
        user={connectData.user}
      >
        <Map>
          <TileLayer params={tileLayer.params} url={tileLayer.url} />
          <View view={this.state.isFollowPoint ? this.geoJSON : this.props.geoJSONData.Path} />
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
