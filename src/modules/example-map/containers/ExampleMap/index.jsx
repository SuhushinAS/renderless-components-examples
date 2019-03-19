import TileRadio from 'modules/example-map/components/TileRadio/index.jsx';
import tileLayerData from 'modules/example-map/data/tile-layer.json';
import Map from "modules/map/containers/Map/index.jsx";
import TileLayer from 'modules/map/containers/TileLayer/index.jsx';
import View from 'modules/map/containers/View/index.jsx';
import React from 'react';
import './style.css';

const view = JSON.parse('{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[444.742012,56.413901],[444.742012,56.579343],[445.170479,56.579343],[445.170479,56.413901],[444.742012,56.413901]]]}}');

const tileLayerList = Object.keys(tileLayerData);

class ExampleMap extends React.Component {
  /**
   * Значения свойств по-умолчанию.
   * https://facebook.github.io/react/docs/typechecking-with-proptypes.html
   */
  static defaultProps = {};

  state = {
    tileId: tileLayerList[0],
  };

  /**
   * Конструктор компонента.
   * @param {*} props Свойства переданые в компонент.
   * @return {undefined}
   */
  constructor(props) {
    super(props);
  }

  /**
   * Вывести компонент.
   * @return {*} Представление.
   */
  render() {
    return (
      <div className="example-map">
        <div className="example-map__side">
          <div>
            {tileLayerList.map(this.renderTileRadio)}
          </div>
        </div>
        <div className="example-map__main">
          <Map>
            <TileLayer {...tileLayerData[this.state.tileId].data} />
            <View onViewChange={console.log} view={view} />
          </Map>
        </div>
      </div>
    );
  }

  renderTileRadio = (tileId) => <TileRadio key={tileId} onChange={this.handleChangeTile} tileId={tileId} value={this.state.tileId} />;

  handleChangeTile = (tileId) => {
    this.setState({tileId});
  };
}

export default ExampleMap;
