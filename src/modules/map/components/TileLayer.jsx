import L from 'leaflet';
import withMap from 'modules/map/hoc/withMap.jsx';
import React from 'react';

class TileLayer extends React.PureComponent {
  render() {
    return null;
  }

  componentDidMount() {
    this.layerAdd();
  }

  componentDidUpdate(props) {
    this.layerDelete();
    this.layerAdd();
  }

  componentWillUnmount() {
    this.layerDelete(this.props);
  }

  layerAdd() {
    const {leaflet, params, url} = this.props;
    this.layer = new L.TileLayer(url, params);
    leaflet.addLayer(this.layer);
  }

  layerDelete() {
    this.props.leaflet.removeLayer(this.layer);
  }
}

export default withMap(TileLayer);
