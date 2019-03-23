import TileLayerItem from 'modules/example-map/components/TileLayerItem/index.jsx';
import tileLayerData from 'modules/example-map/data/tile-layer.json';
import Map from "modules/map/containers/Map/index.jsx";
import TileLayer from 'modules/map/containers/TileLayer/index.jsx';
import ViewSimple from 'modules/map/containers/ViewSimple/index.jsx';
import React from 'react';
import './style.css';

const tileLayerIdList = Object.keys(tileLayerData);

class ExampleMapTile extends React.Component {
  /**
   * Значения свойств по-умолчанию.
   * https://facebook.github.io/react/docs/typechecking-with-proptypes.html
   */
  static defaultProps = {};

  state = {
    tileLayerId: tileLayerIdList[0],
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
              {tileLayerIdList.map(this.renderTileLayer)}
            </fieldset>
          </div>
        </div>
        <div className="example-map__main">
          <Map>
            <TileLayer {...tileLayerData[this.state.tileLayerId]} />
            <ViewSimple />
          </Map>
        </div>
      </div>
    );
  }

  renderTileLayer = (id) => <TileLayerItem key={id} onChange={this.handleTileLayerChange} id={id} value={this.state.tileLayerId} />;

  handleTileLayerChange = (tileLayerId) => {
    this.setState({
      tileLayerId
    });
  };
}

export default ExampleMapTile;
