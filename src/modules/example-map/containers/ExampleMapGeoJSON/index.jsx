import GeoJSONItem from "modules/example-map/components/GeoJSONItem/index.jsx";
import geoJSONData from 'modules/example-map/data/geo-json.json';
import tileLayerData from 'modules/example-map/data/tile-layer.json';
import GeoJSON from 'modules/map/containers/GeoJSON/index.jsx';
import Map from "modules/map/containers/Map/index.jsx";
import TileLayer from 'modules/map/containers/TileLayer/index.jsx';
import View from 'modules/map/containers/View/index.jsx';
import React from 'react';
import './style.css';

const geoJSONIdList = Object.keys(geoJSONData);
const tile = tileLayerData.OpenStreetMap;

class ExampleMapGeoJSON extends React.Component {
  /**
   * Значения свойств по-умолчанию.
   * https://facebook.github.io/react/docs/typechecking-with-proptypes.html
   */
  static defaultProps = {};

  state = {
    showData: {DevPro: true},
  };

  /**
   * Вывести компонент.
   * @return {*} Представление.
   */
  render() {
    const geoJSONList = geoJSONIdList.filter(this.filterGeoJSON).map(this.getGeoJSON);
    return (
      <div className="example-map">
        <div className="example-map__side">
          <div>
            <fieldset>
              <legend>GeoJSON</legend>
              {geoJSONIdList.map(this.renderGeoJSONItem)}
            </fieldset>
          </div>
        </div>
        <div className="example-map__main">
          <Map>
            <TileLayer {...tile} />
            <View view={geoJSONList} />
            {geoJSONList.map(this.renderGeoJSON)}
          </Map>
        </div>
      </div>
    );
  }

  filterGeoJSON = (id) => this.state.showData[id];

  getGeoJSON = (id) => geoJSONData[id];

  renderGeoJSONItem = (id) => <GeoJSONItem key={id} onChange={this.handleGeoJSONChange} id={id} value={this.state.showData} />;

  renderGeoJSON = (geoJSON, id) => <GeoJSON geoJSON={geoJSON} key={id} />;

  handleGeoJSONChange = (id) => {
    this.setState((state) => ({
      ...state,
      showData: {
        ...state.showData,
        [id]: !state.showData[id],
      },
    }));
  };
}

export default ExampleMapGeoJSON;
