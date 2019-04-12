import L from 'leaflet';
import 'modules/map/components/Map.css';
import {MapContext} from 'modules/map/context/MapContext.js';
import React from 'react';

class Map extends React.PureComponent {
  state = {
    isLoad: false,
    leaflet: undefined,
  };

  constructor(props) {
    super(props);
    this.map = React.createRef();
  }

  handleLoad = () => {
    this.setState({isLoad: true});
  };

  render() {
    return (
      <div className="map" ref={this.map}>
        <MapContext.Provider value={this.state}>
          {this.state.leaflet && this.props.children}
        </MapContext.Provider>
      </div>
    );
  }

  componentDidMount() {
    const leaflet = L.map(this.map.current);
    this.setState({leaflet});
    window.addEventListener('load', this.handleLoad);
  }

  componentWillUnmount() {
    this.state.leaflet.remove();
    window.removeEventListener('load', this.handleLoad);
  }
}

export default Map;
