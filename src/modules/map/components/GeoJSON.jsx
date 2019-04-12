import L from 'leaflet';
import withMap from 'modules/map/hoc/withMap.jsx';
import React from 'react';

class GeoJSON extends React.PureComponent {
  render() {
    return null;
  }

  componentDidMount() {
    this.layerAdd(this.props);
  }

  componentDidUpdate(props) {
    this.layerDelete(props);
    this.layerAdd(this.props);
  }

  componentWillUnmount() {
    this.layerDelete(this.props);
  }

  layerAdd(props) {
    const {geoJSON, leaflet} = props;
    this.layer = L.GeoJSON.geometryToLayer(geoJSON);
    leaflet.addLayer(this.layer);
  }

  layerDelete(props) {
    props.leaflet.removeLayer(this.layer);
  }
}

export default withMap(GeoJSON);
