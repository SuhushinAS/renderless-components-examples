import geoJSON from 'data/geo-json.json';
import tile from 'data/tile.json';
import Layout from 'modules/common/components/Layout.jsx';
import ExampleMapMain from 'modules/example-map/components/ExampleMapMain.jsx';
import ExampleMapSide from 'modules/example-map/components/ExampleMapSide.jsx';
import React from 'react';

const geoJSONIdList = Object.keys(geoJSON);
const tileIdList = Object.keys(tile);

class ExampleMap extends React.Component {
  state = {
    showData: {},
    tileId: tileIdList[0],
    view: {},
  };

  get geoJSONList() {
    return geoJSONIdList.filter(this.filterGeoJSON).map(this.getGeoJSON);
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
    const {tileId} = this.state;
    return (
      <ExampleMapMain
        geoJSONList={this.geoJSONList}
        onViewChange={this.handleViewChange}
        tile={tile[tileId]}
      />
    );
  }

  renderSide() {
    const {showData, tileId, view} = this.state;
    return (
      <ExampleMapSide
        geoJSONIdList={geoJSONIdList}
        tileIdList={tileIdList}
        onGeoJSONChange={this.handleGeoJSONChange}
        onTileChange={this.handleTileChange}
        showData={showData}
        tileId={tileId}
        view={view}
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
