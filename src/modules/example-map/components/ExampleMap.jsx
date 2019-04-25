import {request} from 'app/helpers.js';
import Layout from 'modules/common/components/Layout.jsx';
import ExampleMapMain from 'modules/example-map/components/ExampleMapMain.jsx';
import ExampleMapSide from 'modules/example-map/components/ExampleMapSide.jsx';
import React from 'react';

class ExampleMap extends React.Component {
  state = {
    geoJSON: undefined,
    showData: {},
    tile: undefined,
    tileId: undefined,
    view: {},
  };

  constructor(props) {
    super(props);
    this.load('geoJSON', 'api/v1/geo-json');
    this.loadTile();
  }

  async loadTile() {
    const tile = await this.load('tile', 'api/v1/tile');
    this.setState({
      tileId: Object.keys(tile)[0],
    });
  }

  async load(key, url) {
    const data = await request(url);
    this.setState({[key]: data});
    return data;
  }

  render() {
    return (
      <Layout
        main={this.renderMain()}
        side={this.renderSide()}
      />
    );
  }

  renderMain() {
    const {geoJSON, tile, tileId} = this.state;
    if (geoJSON && tile && tileId) {
      const geoJSONList = Object.keys(geoJSON)
        .filter(this.filterGeoJSON)
        .map(this.getGeoJSON);
      return (
        <ExampleMapMain
          geoJSONList={geoJSONList}
          onViewChange={this.handleViewChange}
          tile={tile[tileId]}
        />
      );
    }
    return null;
  }

  renderSide() {
    const {geoJSON, showData, tile, tileId, view} = this.state;
    if (geoJSON && tile && tileId) {
      return (
        <ExampleMapSide
          geoJSONIdList={Object.keys(geoJSON)}
          tileIdList={Object.keys(tile)}
          onGeoJSONChange={this.handleGeoJSONChange}
          onTileChange={this.handleTileChange}
          showData={showData}
          tileId={tileId}
          view={view}
        />
      );
    }
    return null
  }

  filterGeoJSON = (id) => this.state.showData[id];

  getGeoJSON = (id) => this.state.geoJSON[id];

  handleGeoJSONChange = (id) => {
    this.setState((state) => ({
      ...state,
      showData: {
        ...state.showData,
        [id]: !state.showData[id],
      },
    }));
  };

  handleTileChange = (tileId) => {
    this.setState({tileId});
  };

  handleViewChange = (view) => {
    this.setState({view});
  };
}

export default ExampleMap;
