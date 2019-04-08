import tileLayerData from 'modules/example-map/data/tile-layer.json';
import GeoJSON from "modules/map/containers/GeoJSON/index.jsx";
import Map from "modules/map/containers/Map/index.jsx";
import TileLayer from 'modules/map/containers/TileLayer/index.jsx';
import View from 'modules/map/containers/View/index.jsx';
import React from 'react';

const geoJSONList = [
  {
    type: "Polygon",
    coordinates: [
      [
        [61.259766, 65.293468],
        [56.953125, 62.552857],
        [63.632813, 60.802064],
        [71.696777, 62.502175],
        [69.433594, 65.68543],
      ],
    ],
  },
  {
    type: "Polygon",
    coordinates: [
      [
        [90.087891, 63.548552],
        [82.96875, 59.355596],
        [95.668945, 60.305185],
      ],
    ],
  },
];

class ExampleMap extends React.Component {
  state = {
    view: null,
  };

  /**
   * Вывести компонент.
   * @return {*} Представление.
   */
  render() {
    return (
      <Map>
        <TileLayer {...tileLayerData.OpenStreetMap} />
        <View onViewChange={this.handleViewChange} view={geoJSONList} />
        {geoJSONList.map(this.renderGeoJSON)}
      </Map>
    );
  }

  renderGeoJSON = (geoJSON, id) => <GeoJSON geoJSON={geoJSON} key={id} />;

  handleViewChange = (view) => {
    this.setState({view});
  };
}

export default ExampleMap;
