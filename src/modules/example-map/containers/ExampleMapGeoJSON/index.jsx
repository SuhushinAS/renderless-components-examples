import geojsonData from 'modules/example-map/data/geojson.json';
import tileLayerData from 'modules/example-map/data/tile-layer.json';
import view from 'modules/example-map/data/view.json';
import Map from "modules/map/containers/Map/index.jsx";
import TileLayer from 'modules/map/containers/TileLayer/index.jsx';
import GeoJSON from 'modules/map/containers/GeoJSON/index.jsx';
import View from 'modules/map/containers/View/index.jsx';
import React from 'react';
import './style.css';

const geojson = geojsonData[Object.keys(geojsonData)[0]].data;
const tile = tileLayerData[Object.keys(tileLayerData)[0]].data;

class ExampleMapGeoJSON extends React.Component {
  /**
   * Значения свойств по-умолчанию.
   * https://facebook.github.io/react/docs/typechecking-with-proptypes.html
   */
  static defaultProps = {};

  state = {
    geojson,
    geojsonEdit: geojson,
  };

  /**
   * Вывести компонент.
   * @return {*} Представление.
   */
  render() {
    return (
      <div className="example-map">
        <div className="example-map__side">
          <div>
            <form onSubmit={this.handlePaint}>
              <fieldset>
                <legend>GeoJSON</legend>
                <textarea cols="31"
                          id="view"
                          name="view"
                          onChange={this.handleGeojsonEdit}
                          rows="31"
                          value={JSON.stringify(this.state.geojsonEdit, undefined, 2)} />
                <button type="submit">Paint</button>
              </fieldset>
            </form>
          </div>
        </div>
        <div className="example-map__main">
          <Map>
            <TileLayer {...tile} />
            <View view={view} />
            <GeoJSON geojson={this.state.geojson} />
          </Map>
        </div>
      </div>
    );
  }

  handleGeojsonEdit = (e) => {
    console.log(e.target.value);
    this.setState({
      geojsonEdit: JSON.parse(e.target.value),
    });
  };

  handlePaint = (e) => {
    e.preventDefault();
    this.setState(this.setGeoJSON);
  };

  setGeoJSON = (state) => ({
    ...state,
    geojson: state.geojsonEdit,
  });
}

export default ExampleMapGeoJSON;
