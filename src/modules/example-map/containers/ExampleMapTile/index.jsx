import TileRadio from 'modules/example-map/components/TileRadio/index.jsx';
import tileLayerData from 'modules/example-map/data/tile-layer.json';
import Map from "modules/map/containers/Map/index.jsx";
import TileLayer from 'modules/map/containers/TileLayer/index.jsx';
import ViewSimple from 'modules/map/containers/ViewSimple/index.jsx';
import React from 'react';
import './style.css';

const tileLayerList = Object.keys(tileLayerData);

class ExampleMapTile extends React.Component {
  /**
   * Значения свойств по-умолчанию.
   * https://facebook.github.io/react/docs/typechecking-with-proptypes.html
   */
  static defaultProps = {};

  state = {
    tileId: tileLayerList[0],
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
            <fieldset>
              <legend>Tile layer</legend>
              {tileLayerList.map(this.renderTileRadio)}
            </fieldset>
          </div>
        </div>
        <div className="example-map__main">
          <Map>
            <TileLayer {...tileLayerData[this.state.tileId].data} />
            <ViewSimple />
          </Map>
        </div>
      </div>
    );
  }

  renderTileRadio = (tileId) => <TileRadio key={tileId} onChange={this.handleTileChange} tileId={tileId} value={this.state.tileId} />;

  handleTileChange = (tileId) => {
    this.setState({
      tileId
    });
  };
}

export default ExampleMapTile;
