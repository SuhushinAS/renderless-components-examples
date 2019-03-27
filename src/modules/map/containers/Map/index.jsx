import L from 'leaflet';
import {MapContext} from 'modules/map/context/index.js';
import React from 'react';
import './style.css';

// Фикс иконок на картах
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

class Map extends React.PureComponent {
  state = {
    isLoad: false,
    leaflet: undefined,
  };

  /**
   * Конструктор компонента.
   * @param {*} props Свойства переданые в компонент.
   * @return {undefined}
   */
  constructor(props) {
    super(props);
    window.addEventListener('load', this.handleLoad);
  }

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
  }

  /**
   * Вызывается сразу перед тем, как компонент будет удален из DOM.
   * @return {undefined}
   */
  componentWillUnmount() {
    this.state.leaflet.remove();
    this.setState({leaflet: undefined});
    window.removeEventListener('load', this.handleLoad);
  }
}

export default Map;
