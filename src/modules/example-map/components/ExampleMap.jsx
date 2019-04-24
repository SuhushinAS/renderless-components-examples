import Layout from 'modules/common/components/Layout.jsx';
import ExampleMapMain from 'modules/example-map/components/ExampleMapMain.jsx';
import ExampleMapSide from 'modules/example-map/components/ExampleMapSide.jsx';
import geoJSON from 'modules/example-map/data/geo-json.json';
import tile from 'modules/example-map/data/tile-layer.json';
import React from 'react';

const geoJSONIdList = Object.keys(geoJSON);
const tileIdList = Object.keys(tile);

class ExampleMap extends React.Component {
  state = {
    showData: {},
    tileId: tileIdList[0],
    view: {},
  };

  render() {
    return (
      <Layout
        main={this.renderMain()}
        side={this.renderSide()}
      />
    );
  }

  renderMain() {
    const geoJSONList = geoJSONIdList
      .filter(this.filterGeoJSON)
      .map(this.getGeoJSON);
    return (
      <ExampleMapMain
        geoJSONList={geoJSONList}
        onViewChange={this.handleViewChange}
        tile={tile[this.state.tileId]}
      />
    );
  }

  renderSide() {
    return (
      <ExampleMapSide
        geoJSONIdList={geoJSONIdList}
        tileIdList={tileIdList}
        onGeoJSONChange={this.handleGeoJSONChange}
        onTileChange={this.handleTileChange}
        showData={this.state.showData}
        tileId={this.state.tileId}
        view={this.state.view}
      />
    );
  }

  filterGeoJSON = (id) => this.state.showData[id];

  getGeoJSON = (id) => geoJSON[id];

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
