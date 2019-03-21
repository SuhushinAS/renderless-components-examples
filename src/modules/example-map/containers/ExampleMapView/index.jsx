import tileLayerData from 'modules/example-map/data/tile-layer.json';
import view from 'modules/example-map/data/view.json';
import Map from "modules/map/containers/Map/index.jsx";
import TileLayer from 'modules/map/containers/TileLayer/index.jsx';
import View from 'modules/map/containers/View/index.jsx';
import React from 'react';
import './style.css';

const tile = tileLayerData[Object.keys(tileLayerData)[0]].data;

class ExampleMapView extends React.Component {
  /**
   * Значения свойств по-умолчанию.
   * https://facebook.github.io/react/docs/typechecking-with-proptypes.html
   */
  static defaultProps = {};

  state = {
    view,
    viewEdit: view,
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
            <TileLayer {...tile} />
            <View onViewChange={this.handleViewChange} view={this.state.view} />
          </Map>
        </div>
      </div>
    );
  }

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

export default ExampleMapView;
