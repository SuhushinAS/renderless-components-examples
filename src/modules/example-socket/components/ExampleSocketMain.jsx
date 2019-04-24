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
    const {connect, geoJSON, tile} = this.props;
    const {isFollow, point} = this.state;
    const view = isFollow ? this.geoJSON : geoJSON.Path;
    return (
      <Centrifuge {...connect}>
        <Map>
          <TileLayer params={tile.params} url={tile.url} />
          <View view={view} />
          <Marker point={point} />
        </Map>
        <Subscribe channel="userstory+devpro" eventData={this.eventData} />
      </Centrifuge>
    );
  }
}

export default ExampleSocketMain;
