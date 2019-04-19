import Layout from 'modules/common/components/Layout.jsx';
import ExampleMapMain from 'modules/example-map/components/ExampleMapMain.jsx';
import ExampleMapSide from 'modules/example-map/components/ExampleMapSide.jsx';
import geoJSONData from 'modules/example-map/data/geo-json.json';
import tileLayerData from 'modules/example-map/data/tile-layer.json';
import React from 'react';

const geoJSONIdList = Object.keys(geoJSONData);
const tileLayerIdList = Object.keys(tileLayerData);

class ExampleMap extends React.Component {
  state = {
    showData: {},
    tileLayerId: tileLayerIdList[0],
    view: {},
  };

  render() {
    return (
      <Layout main={this.renderMain()} side={this.renderSide()} />
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
        tileLayer={tileLayerData[this.state.tileLayerId]}
      />
    );
  }

  renderSide() {
    return (
      <ExampleMapSide
        geoJSONIdList={geoJSONIdList}
        tileLayerIdList={tileLayerIdList}
        onGeoJSONChange={this.handleGeoJSONChange}
        onTileLayerChange={this.handleTileLayerChange}
        showData={this.state.showData}
        tileLayerId={this.state.tileLayerId}
        view={this.state.view}
      />
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
}

export default ExampleMap;
