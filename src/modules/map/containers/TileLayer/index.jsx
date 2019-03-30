import L from 'leaflet';
import withMap from 'modules/map/hoc/withMap/index.jsx';
import React from 'react';

class TileLayer extends React.PureComponent {
  /**
   * Отображение компонента
   * @return {*} Представление компонента.
   */
  render() {
    return null;
  }

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
    this.layerDelete(props);
    this.layerAdd(this.props);
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
    const {leaflet, params, url} = props;

    this.layer = new L.TileLayer(url, params);
    leaflet.addLayer(this.layer);
  }

  /**
   * Удалить слой.
   * @return {undefined}
   */
  layerDelete(props) {
    props.leaflet.removeLayer(this.layer);
  }
}

export default withMap(TileLayer);
