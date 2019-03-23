import tileLayerData from 'modules/example-map/data/tile-layer.json';
import view from 'modules/example-map/data/view.json';
import Map from "modules/map/containers/Map/index.jsx";
import TileLayer from 'modules/map/containers/TileLayer/index.jsx';
import View from 'modules/map/containers/View/index.jsx';
import React from 'react';
import ViewItem from 'modules/example-map/components/ViewItem/index.jsx';
import './style.css';

const tile = tileLayerData.OpenStreetMap;

class ExampleMapView extends React.Component {
  /**
   * Значения свойств по-умолчанию.
   * https://facebook.github.io/react/docs/typechecking-with-proptypes.html
   */
  static defaultProps = {};

  state = {
    view,
    viewList: [],
  };

  /**
   * Вывести компонент.
   * @return {*} Представление.
   */
  render() {
    return (
      <div className="example-map">
        <div className="example-map__side">
          <fieldset>
            <legend>View</legend>
            <textarea cols="31"
                      disabled
                      id="view"
                      name="view"
                      rows="31"
                      value={JSON.stringify(this.state.view, undefined, 2)} />
            <button onClick={this.handleSave} type="submit">Save</button>
          </fieldset>
          <fieldset>
            <legend>ViewList</legend>
            {this.state.viewList.map(this.renderViewList)}
          </fieldset>
        </div>
        <div className="example-map__main">
          <Map>
            <TileLayer {...tile} />
            <View onViewChange={this.handleViewSet} view={this.state.view} />
          </Map>
        </div>
      </div>
    );
  }

  renderViewList = (view, id) => {
    return (
      <ViewItem id={id} key={id} onDelete={this.handleViewDelete} onSet={this.handleViewSet} view={view} />
    );
  };

  handleViewDelete = (deleteId) => {
    this.setState((state) => ({
      ...state,
      viewList: state.viewList.filter((_, id) => deleteId !== id),
    }));
  };

  handleViewSet = (view) => {
    this.setState({view});
  };

  handleSave = (e) => {
    e.preventDefault();
    this.setState((state) => ({
      ...state,
      viewList: [
        ...state.viewList,
        state.view,
      ],
    }));
  };
}

export default ExampleMapView;
