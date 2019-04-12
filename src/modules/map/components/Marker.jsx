import L from 'leaflet';
import 'modules/map/components/Marker.css';
import withMap from 'modules/map/hoc/withMap.jsx';
import React from 'react';

// Фикс иконок на картах
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  className: 'marker',
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

class Marker extends React.PureComponent {
  componentDidMount() {
    this.layerAdd(this.props);
  }

  componentDidUpdate() {
    this.layer.setLatLng(L.GeoJSON.coordsToLatLng(this.props.point));
  }

  componentWillUnmount() {
    this.layerDelete(this.props);
  }

  layerAdd(props) {
    const {point, leaflet} = props;
    this.layer = L.marker(L.GeoJSON.coordsToLatLng(point));
    leaflet.addLayer(this.layer);
  }

  layerDelete(props) {
    props.leaflet.removeLayer(this.layer);
  }

  render() {
    return null;
  }
}

export default withMap(Marker);
