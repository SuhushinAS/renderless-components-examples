import Layout from 'modules/common/containers/Layout/index.jsx';
import GeoJSONItem from "modules/example-map/components/GeoJSONItem/index.jsx";
import TileLayerItem from 'modules/example-map/components/TileLayerItem/index.jsx';
import geoJSONData from 'modules/example-map/data/geo-json.json';
import tileLayerData from 'modules/example-map/data/tile-layer.json';
import GeoJSON from 'modules/map/containers/GeoJSON/index.jsx';
import Map from "modules/map/containers/Map/index.jsx";
import TileLayer from 'modules/map/containers/TileLayer/index.jsx';
import View from 'modules/map/containers/View/index.jsx';
import React from 'react';

const geoJSONIdList = Object.keys(geoJSONData);
const tileLayerIdList = Object.keys(tileLayerData);

class ExampleMap extends React.Component {
  state = {
    showData: {},
    tileLayerId: tileLayerIdList[0],
    view: {},
  };

  /**
   * Вывести компонент.
   * @return {*} Представление.
   */
  render() {
    return (
      <Layout main={this.renderMain()} side={this.renderSide()} />
    );
  }

  renderMain() {
    const geoJSONList = geoJSONIdList.filter(this.filterGeoJSON).map(this.getGeoJSON);
    return (
      <Map>
        <TileLayer {...tileLayerData[this.state.tileLayerId]} />
        <View onViewChange={this.handleViewChange} view={geoJSONList} />
        {geoJSONList.map(this.renderGeoJSON)}
      </Map>
    );
  }

  renderSide() {
    return (
      <React.Fragment>
        <fieldset>
          <legend>Tile layer</legend>
          {tileLayerIdList.map(this.renderTileLayer)}
        </fieldset>
        <fieldset>
          <legend>View</legend>
          <textarea cols="31"
                    disabled
                    id="view"
                    name="view"
                    rows="31"
                    value={JSON.stringify(this.state.view, undefined, 2)} />
        </fieldset>
        <fieldset>
          <legend>GeoJSON</legend>
          {geoJSONIdList.map(this.renderGeoJSONItem)}
        </fieldset>
      </React.Fragment>
    );
  }

  filterGeoJSON = (id) => this.state.showData[id];

  getGeoJSON = (id) => geoJSONData[id];

  handleGeoJSONChange = (id) => {
    this.setState((state) => ({
      ...state,
      showData: {
        ...state.showData,
        [id]: !state.showData[id],
      },
    }));
  };

  handleTileLayerChange = (tileLayerId) => {
    this.setState({tileLayerId});
  };

  handleViewChange = (view) => {
    this.setState({view});
  };

  renderGeoJSON = (geoJSON, id) => <GeoJSON geoJSON={geoJSON} key={id} />;

  renderGeoJSONItem = (id) => <GeoJSONItem key={id} onChange={this.handleGeoJSONChange} id={id} value={this.state.showData} />;

  renderTileLayer = (id) => <TileLayerItem key={id} onChange={this.handleTileLayerChange} id={id} value={this.state.tileLayerId} />;
}

export default ExampleMap;
