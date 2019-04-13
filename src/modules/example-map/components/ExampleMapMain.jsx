import GeoJSON from 'modules/map/components/GeoJSON.jsx';
import Map from 'modules/map/components/Map.jsx';
import TileLayer from 'modules/map/components/TileLayer.jsx';
import View from 'modules/map/components/View.jsx';
import React from 'react';

class ExampleMapMain extends React.Component {
  render() {
    const {geoJSONList, onViewChange, tileLayer} = this.props;
    return (
      <Map>
        <TileLayer params={tileLayer.params} url={tileLayer.url} />
        <View onViewChange={onViewChange} view={geoJSONList} />
        {geoJSONList.map(this.renderGeoJSON)}
      </Map>
    );
  }

  renderGeoJSON = (geoJSON, id) => <GeoJSON geoJSON={geoJSON} key={id} />;
}

export default ExampleMapMain;
