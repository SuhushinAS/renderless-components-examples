import L from 'leaflet';
import withMap from 'modules/map/hoc/withMap.jsx';
import React from 'react';

class View extends React.Component {
  bounds;

  static getBounds(view) {
    return L.geoJSON(view).getBounds();
  }

  handleViewChange = () => {
    const {leaflet, onViewChange} = this.props;

    if (onViewChange) {
      const bounds = leaflet.getBounds();
      const rectangle = L.rectangle(bounds);
      const view = rectangle.toGeoJSON();
      onViewChange(view);
    }
  };

  render() {
    return null;
  }

  componentDidMount() {
    this.fly();
    this.props.leaflet.on('moveend zoomend', this.handleViewChange);
  }

  fly() {
    const {leaflet, view} = this.props;
    const bounds = View.getBounds(view);
    if (bounds.isValid()) {
      leaflet.fitBounds(bounds);
    } else {
      leaflet.fitWorld({padding: [0, 0]});
    }
    this.handleViewChange();
  }

  componentDidUpdate(props) {
    const {isLoad, view} = this.props;

    if (!props.isLoad && isLoad) {
      this.props.leaflet.invalidateSize();
      this.fly();
    }

    if (view !== props.view) {
      const bounds = View.getBounds(view);
      if (bounds.isValid() && !bounds.equals(this.bounds)) {
        this.bounds = bounds;
        this.fly();
      }
    }
  }

  componentWillUnmount() {
    this.props.leaflet.off('moveend zoomend', this.handleViewChange);
  }
}

export default withMap(View);
