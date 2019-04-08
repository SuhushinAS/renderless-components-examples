import L from 'leaflet';
import withMap from "modules/map/hoc/withMap/index.jsx";
import React from 'react';

class View extends React.Component {
  bounds;

  static getBounds(view) {
    return L.geoJSON(view).getBounds();
  }

  /**
   * Обработать смену положения карты
   * @return {undefined}
   */
  handleViewChange = () => {
    const {leaflet, onViewChange} = this.props;

    if (onViewChange) {
      const bounds = leaflet.getBounds();
      const rectangle = L.rectangle(bounds);
      const view = rectangle.toGeoJSON();
      onViewChange(view);
    }
  };

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
    this.fly();
    this.props.leaflet.on('moveend zoomend', this.handleViewChange);
  }

  /**
   * Перейти к виду
   * @return {undefined}
   */
  fly() {
    const {leaflet, view} = this.props;
    const bounds = View.getBounds(view);
    if (bounds.isValid()) {
      leaflet.fitBounds(bounds);
    } else {
      leaflet.fitWorld({padding: [0, 0]});
    }
  }

  /**
   * Вызывается сразу после render.
   * Не вызывается в момент первого render'а компонента.
   * @param {*} props - Предыдущие свойства.
   // * @param {*} state - Предыдущее состояние.
   * @return {undefined}
   */
  componentDidUpdate(props) {
    const {isLoad, view} = this.props;

    if (!props.isLoad && isLoad) {
      this.props.leaflet.invalidateSize();
      this.fly();
    }

    if (view !== props.view) {
      const bounds = View.getBounds(view);
      if (bounds.isValid() && !bounds.equals(this.bounds)) {
        this.bounds = bounds;
        this.fly();
      }
    }
  }

  /**
   * Вызывается сразу перед тем, как компонент будет удален из DOM.
   * @return {undefined}
   */
  componentWillUnmount() {
    this.props.leaflet.off('moveend zoomend', this.handleViewChange);
  }
}

export default withMap(View);
