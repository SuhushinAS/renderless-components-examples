import L from 'leaflet';
import withMap from 'modules/map/hoc/withMap/index.jsx';
import React from 'react';

class TileLayer extends React.PureComponent {
  /**
   * Компонент примонтировался.
   * В данный момент у нас есть возможность использовать refs,
   * а следовательно это то самое место, где мы хотели бы указать установку фокуса.
   * Так же, таймауты, ajax-запросы и взаимодействие с другими библиотеками стоит обрабатывать здесь.
   * @return {undefined}
   */
  componentDidMount() {
    this.tileLayerAdd(this.props);
  }

  /**
   * Вызывается сразу после render.
   * Не вызывается в момент первого render'а компонента.
   * @param {*} props Предыдущие свойства.
   // * @param {*} state Предыдущее состояние.
   * @return {undefined}
   */
  componentDidUpdate(props) {
    this.tileLayerDelete(props);
    this.tileLayerAdd(this.props);
  }

  /**
   * Вызывается сразу перед тем, как компонент будет удален из DOM.
   * @return {undefined}
   */
  componentWillUnmount() {
    this.tileLayerDelete(this.props);
  }

  /**
   * Добавить слой.
   * @return {undefined}
   */
  tileLayerAdd(props) {
    const {leaflet, params, url} = props;

    if (leaflet) {
      this.tileLayer = new L.TileLayer(url, params);
      leaflet.addLayer(this.tileLayer);
    }
  }

  /**
   * Удалить слой.
   * @return {undefined}
   */
  tileLayerDelete(props) {
    const {leaflet} = props;

    if (leaflet) {
      leaflet.removeLayer(this.tileLayer);
    }
  }

  /**
   * Отображение компонента
   * @return {*} Представление компонента.
   */
  render() {
    return null;
  }
}

export default withMap(TileLayer);
