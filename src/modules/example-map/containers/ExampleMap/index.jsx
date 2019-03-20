import TileRadio from 'modules/example-map/components/TileRadio/index.jsx';
import tileLayerData from 'modules/example-map/data/tile-layer.json';
import view from 'modules/example-map/data/view.json';
import Map from "modules/map/containers/Map/index.jsx";
import TileLayer from 'modules/map/containers/TileLayer/index.jsx';
import View from 'modules/map/containers/View/index.jsx';
import React from 'react';
import './style.css';

const tileLayerList = Object.keys(tileLayerData);

class ExampleMap extends React.Component {
  /**
   * Значения свойств по-умолчанию.
   * https://facebook.github.io/react/docs/typechecking-with-proptypes.html
   */
  static defaultProps = {};

  state = {
    tileId: tileLayerList[0],
    view,
    viewEdit: view,
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
            <fieldset>
              <legend>Tile layer</legend>
              {tileLayerList.map(this.renderTileRadio)}
            </fieldset>
            <fieldset>
              <legend>View</legend>
              <textarea cols="31"
                        id="view"
                        name="view"
                        onChange={this.handleViewEdit}
                        rows="31"
                        value={JSON.stringify(this.state.viewEdit, undefined, 2)} />
              <button onClick={this.handleFlyButtonClick}>Fly</button>
            </fieldset>
          </div>
        </div>
        <div className="example-map__main">
          <Map>
            <TileLayer {...tileLayerData[this.state.tileId].data} />
            <View onViewChange={this.handleViewChange} view={this.state.view} />
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

  handleViewChange = (view) => {
    this.setState({
      view,
      viewEdit: view
    });
  };

  handleViewEdit = (e) => {
    this.setState({
      viewEdit: JSON.parse(e.target.value),
    });
  };

  handleFlyButtonClick = () => {
    this.setState(this.setView);
  };

  setView = (state) => ({
    ...state,
    view: state.viewEdit,
  });
}

export default ExampleMap;
