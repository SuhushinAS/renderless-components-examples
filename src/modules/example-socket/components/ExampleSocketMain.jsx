import Centrifuge from 'modules/centrifuge/components/Centrifuge.jsx';
import Subscribe from 'modules/centrifuge/components/Subscribe.jsx';
import Map from 'modules/map/components/Map.jsx';
import Marker from 'modules/map/components/Marker.jsx';
import TileLayer from 'modules/map/components/TileLayer.jsx';
import View from 'modules/map/components/View.jsx';
import React from 'react';

class ExampleSocketMain extends React.Component {
  state = {
    isFollow: false,
  };

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

  eventData = {
    message: (message) => {
      switch (message.data.type) {
        case 'setPoint':
          this.setState({point: message.data.point});
          break;
        case 'setView':
          this.setState((state) => ({
            ...state,
            isFollow: !state.isFollow,
          }));
          break;
        default:
          break;
      }
    },
  };

  render() {
    const {connectData, geoJSON, tileLayer} = this.props;
    const {isFollow, point} = this.state;
    return (
      <Centrifuge
        secret={connectData.secret}
        url={connectData.url}
        user={connectData.user}
      >
        <Map>
          <TileLayer params={tileLayer.params} url={tileLayer.url} />
          <View view={isFollow ? this.geoJSON : geoJSON.Path} />
          <Marker point={point} />
        </Map>
        <Subscribe channel="userstory-at-devpro" eventData={this.eventData} />
      </Centrifuge>
    );
  }
}

export default ExampleSocketMain;
