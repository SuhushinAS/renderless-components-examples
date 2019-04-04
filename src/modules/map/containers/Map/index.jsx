import L from 'leaflet';
import {MapContext} from 'modules/map/context/index.js';
import React from 'react';
import './style.css';

class Map extends React.PureComponent {
  state = {
    isLoad: false,
    leaflet: undefined,
  };

  handleClick = (e) => {
    const geoJSON = L.marker(e.latlng).toGeoJSON();
    console.log(JSON.stringify(geoJSON));
  };

  handleLoad = () => {
    this.setState({isLoad: true});
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
        <MapContext.Provider value={this.state}>
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
    const leaflet = L.map(this.map);
    this.setState({leaflet});
    leaflet.on('click', this.handleClick);
    window.addEventListener('load', this.handleLoad);
  }

  /**
   * Вызывается сразу перед тем, как компонент будет удален из DOM.
   * @return {undefined}
   */
  componentWillUnmount() {
    this.state.leaflet.off('click', this.handleClick);
    this.state.leaflet.remove();
    this.setState({leaflet: undefined});
    window.removeEventListener('load', this.handleLoad);
  }
}

export default Map;
