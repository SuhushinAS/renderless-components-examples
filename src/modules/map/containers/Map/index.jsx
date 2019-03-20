import L from 'leaflet';
import React from 'react';
import './style.css';
import {MapContext} from 'modules/map/context/index.js';

class Map extends React.PureComponent {
  /**
   * Значения свойств по-умолчанию.
   * https://facebook.github.io/react/docs/typechecking-with-proptypes.html
   */
  static defaultProps = {};

  state = {
    leaflet: undefined,
  };

  /**
   * Получить ref.
   * @param {*} map ref.
   * @return {undefined}
   */
  refMap = (map) => {
    this.map = map;
  };

  /**
   * Вывести компонент.
   * @return {*} Представление.
   */
  render() {
    return (
      <div className="map" ref={this.refMap}>
        <MapContext.Provider value={this.state.leaflet}>
          {this.state.leaflet && this.props.children}
        </MapContext.Provider>
      </div>
    );
  }

  /**
   * Компонент примонтировался.
   * В данный момент у нас есть возможность использовать refs,
   * а следовательно это то самое место, где мы хотели бы указать установку фокуса.
   * Так же, таймауты, ajax-запросы и взаимодействие с другими библиотеками стоит обрабатывать здесь.
   * @return {undefined}
   */
  componentDidMount() {
    this.setState({leaflet: L.map(this.map)});
  }

  /**
   * Вызывается сразу перед тем, как компонент будет удален из DOM.
   * @return {undefined}
   */
  componentWillUnmount() {
    this.state.leaflet.remove();
    this.setState({leaflet: undefined});
  }
}

export default Map;
