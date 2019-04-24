import L from 'leaflet';
import 'modules/map/components/Marker.css';
import withMap from 'modules/map/context/MapContext.jsx';
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
    this.layerAdd(this.props.point);
  }

  componentDidUpdate() {
    this.layerUpdate(this.props.point);
  }

  componentWillUnmount() {
    this.layerDelete();
  }

  layerAdd(point) {
    if (point) {
      this.layer = L.marker(L.GeoJSON.coordsToLatLng(point));
      this.props.leaflet.addLayer(this.layer);
    }
  }

  layerUpdate(point) {
    if (point) {
      if (this.layer) {
        this.layer.setLatLng(L.GeoJSON.coordsToLatLng(point));
      } else {
        this.layerAdd(point);
      }
    }
  }

  layerDelete() {
    if (this.layer) {
      this.props.leaflet.removeLayer(this.layer);
    }
  }

  render() {
    return null;
  }
}

export default withMap(Marker);
