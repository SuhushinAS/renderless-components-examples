import GeoJSONField from 'modules/example-map/components/GeoJSONField.jsx';
import TileLayerField from 'modules/example-map/components/TileLayerField.jsx';
import React from 'react';

class ExampleMapSide extends React.Component {
  render() {
    const {geoJSONIdList, tileLayerIdList, view} = this.props;
    return (
      <React.Fragment>
        <fieldset>
          <legend>Tile layer</legend>
          {tileLayerIdList.map(this.renderTileLayerField)}
        </fieldset>
        <fieldset>
          <legend>View</legend>
          <textarea
            cols="31"
            disabled
            id="view"
            name="view"
            rows="31"
            value={JSON.stringify(view, undefined, 2)}
          />
        </fieldset>
        <fieldset>
          <legend>GeoJSON</legend>
          {geoJSONIdList.map(this.renderGeoJSONField)}
        </fieldset>
      </React.Fragment>
    );
  }

  renderGeoJSONField = (id) => (
    <GeoJSONField
      key={id}
      onChange={this.props.onGeoJSONChange}
      id={id}
      value={this.props.showData}
    />
  );

  renderTileLayerField = (id) => (
    <TileLayerField
      key={id}
      onChange={this.props.onTileLayerChange}
      id={id}
      value={this.props.tileLayerId}
    />
  );
}

export default ExampleMapSide;