import withMap from "modules/map/hoc/withMap/index.jsx";
import React from 'react';

class View extends React.Component {
  /**
   * Конструктор компонента.
   * @param {*} props Свойства переданые в компонент.
   * @return {undefined}
   */
  constructor(props) {
    super(props);
    this.fly();
  }

  fly() {
    const {leaflet} = this.props;
    leaflet.fitWorld({padding: [0, 0]});
  }

  /**
   * Отображение компонента
   * @return {*} Представление компонента.
   */
  render() {
    return null;
  }

  /**
   * Вызывается сразу после render.
   * Не вызывается в момент первого render'а компонента.
   * @param {*} props - Предыдущие свойства.
   // * @param {*} state - Предыдущее состояние.
   * @return {undefined}
   */
  componentDidUpdate(props) {
    const {isLoad} = this.props;
    if (!props.isLoad && isLoad) {
      this.props.leaflet.invalidateSize();
      this.fly();
    }
  }
}

export default withMap(View);
