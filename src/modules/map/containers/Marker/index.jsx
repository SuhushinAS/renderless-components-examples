import L from 'leaflet';
import withMap from 'modules/map/hoc/withMap/index.jsx';
import React from 'react';
import './style.css';

// Фикс иконок на картах
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  className: 'marker',
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

class GeoJSON extends React.PureComponent {
  /**
   * Компонент примонтировался.
   * В данный момент у нас есть возможность использовать refs,
   * а следовательно это то самое место, где мы хотели бы указать установку фокуса.
   * Так же, таймауты, ajax-запросы и взаимодействие с другими библиотеками стоит обрабатывать здесь.
   * @return {undefined}
   */
  componentDidMount() {
    this.layerAdd(this.props);
  }

  /**
   * Вызывается сразу после render.
   * Не вызывается в момент первого render'а компонента.
   * @param {*} props Предыдущие свойства.
   // * @param {*} state Предыдущее состояние.
   * @return {undefined}
   */
  componentDidUpdate(props) {
    const {geoJSON} = this.props;
    const latlng = L.GeoJSON.coordsToLatLng(geoJSON.geometry.coordinates);

    this.layer.setLatLng(latlng);
  }

  /**
   * Вызывается сразу перед тем, как компонент будет удален из DOM.
   * @return {undefined}
   */
  componentWillUnmount() {
    this.layerDelete(this.props);
  }

  /**
   * Добавить слой.
   * @return {undefined}
   */
  layerAdd(props) {
    const {geoJSON, leaflet} = props;
    this.layer = L.GeoJSON.geometryToLayer(geoJSON);
    leaflet.addLayer(this.layer);
  }

  /**
   * Удалить слой.
   * @return {undefined}
   */
  layerDelete(props) {
    props.leaflet.removeLayer(this.layer);
  }

  /**
   * Отображение компонента
   * @return {*} Представление компонента.
   */
  render() {
    return null;
  }
}

export default withMap(GeoJSON);
