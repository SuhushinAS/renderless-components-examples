import L from 'leaflet';
import withMap from 'modules/map/hoc/withMap.jsx';
import React from 'react';

class TileLayer extends React.PureComponent {
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
    const {leaflet, params, url} = props;

    this.layer = new L.TileLayer(url, params);
    leaflet.addLayer(this.layer);
  }

  layerDelete(props) {
    props.leaflet.removeLayer(this.layer);
  }
}

export default withMap(TileLayer);
