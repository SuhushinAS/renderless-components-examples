import L from 'leaflet';
import 'modules/map/components/Marker.css';
import withMap from 'modules/map/hoc/withMap.jsx';
import React from 'react';

// Фикс иконок на картах
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  className: 'marker',
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

class Marker extends React.PureComponent {
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
   // * @param {*} props Предыдущие свойства.
   // * @param {*} state Предыдущее состояние.
   * @return {undefined}
   */
  componentDidUpdate() {
    this.layer.setLatLng(L.GeoJSON.coordsToLatLng(this.props.point));
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
    const {point, leaflet} = props;
    this.layer = L.marker(L.GeoJSON.coordsToLatLng(point));
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

export default withMap(Marker);
