import GeoJSONField from 'modules/example-map/components/GeoJSONField.jsx';
import TileField from 'modules/example-map/components/TileField.jsx';
import React from 'react';

class ExampleMapSide extends React.Component {
  render() {
    const {geoJSONIdList, tileIdList, view} = this.props;
    return (
      <React.Fragment>
        <fieldset>
          <legend>Tile layer</legend>
          {tileIdList.map(this.renderTileField)}
        </fieldset>
        <fieldset>
          <legend>GeoJSON</legend>
          {geoJSONIdList.map(this.renderGeoJSONField)}
        </fieldset>
        <fieldset>
          <legend>View</legend>
          <code>
            {JSON.stringify(view.geometry, undefined, 2)}
          </code>
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

  renderTileField = (id) => (
    <TileField
      key={id}
      onChange={this.props.onTileChange}
      id={id}
      value={this.props.tileId}
    />
  );
}

export default ExampleMapSide;
