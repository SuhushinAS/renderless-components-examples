import tileLayerData from "modules/example-map/data/tile-layer.json";
import React from 'react';
import './style.css';

class TileRadio extends React.Component {
  /**
   * Значения свойств по-умолчанию.
   * https://facebook.github.io/react/docs/typechecking-with-proptypes.html
   */
  static defaultProps = {
    onChange: () => {},
  };

  /**
   * Вывести компонент.
   * @return {*} Представление.
   */
  render() {
    const {tileId, value} = this.props;
    return (
      <label className="tile-radio" htmlFor={tileId}>
        <input id={tileId} name="tile" onChange={this.handleChange} checked={value === tileId} type="radio" />
        {tileLayerData[tileId].name}
      </label>
    );
  }

  handleChange = () => {
    this.props.onChange(this.props.tileId);
  };

  /**
   * Компонент примонтировался.
   * В данный момент у нас есть возможность использовать refs,
   * а следовательно это то самое место, где мы хотели бы указать установку фокуса.
   * Так же, таймауты, ajax-запросы и взаимодействие с другими библиотеками стоит обрабатывать здесь.
   * @return {undefined}
   */
  // componentDidMount() {}

  /**
   * Должен ли компонент обновиться?
   * На самом деле, обычно реакт сам отлично разбирается.
   * Но иногда ручное управление позволяет существенно ускорить работу в "узких местах".
   * @param {*} nextProps Новые свойства.
   * @param {*} nextState Новое состояние.
   * @return {boolean} Должен ли компонент обновиться?
   */
  // shouldComponentUpdate(nextProps, nextState) {}

  /**
   * Вызывается сразу после render.
   * Не вызывается в момент первого render'а компонента.
   * @param {*} props Предыдущие свойства.
   * @param {*} state Предыдущее состояние.
   * @return {undefined}
   */
  // componentDidUpdate(props, state) {}

  /**
   * Вызывается сразу перед тем, как компонент будет удален из DOM.
   * @return {undefined}
   */
  // componentWillUnmount() {}
}

export default TileRadio;
