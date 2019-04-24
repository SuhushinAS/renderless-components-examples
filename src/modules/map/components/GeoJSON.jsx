import L from 'leaflet';
import withMap from 'modules/map/context/MapContext.jsx';
import React from 'react';

class GeoJSON extends React.PureComponent {
  render() {
    return null;
  }

  componentDidMount() {
    this.layerAdd();
  }

  componentDidUpdate() {
    this.layerDelete();
    this.layerAdd();
  }

  componentWillUnmount() {
    this.layerDelete();
  }

  layerAdd() {
    const {geoJSON, leaflet} = this.props;
    this.layer = L.GeoJSON.geometryToLayer(geoJSON);
    leaflet.addLayer(this.layer);
  }

  layerDelete() {
    this.props.leaflet.removeLayer(this.layer);
  }
}

export default withMap(GeoJSON);
