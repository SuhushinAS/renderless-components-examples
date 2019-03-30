import Centrifuge from "modules/centrifuge/containers/Centrifuge/index.jsx";
import React from 'react';
import Subscribe from 'modules/centrifuge/containers/Subscribe/index.jsx';

const secret = 'secret';
const url = 'https://centrifugo.herokuapp.com/connection/websocket';
const user = 'user';

class ExampleSocket extends React.Component {
  /**
   * Значения свойств по-умолчанию.
   * https://facebook.github.io/react/docs/typechecking-with-proptypes.html
   */
  static defaultProps = {};

  /**
   * Конструктор компонента.
   * @param {*} props Свойства переданые в компонент.
   * @return {undefined}
   */
  // constructor(props) {}

  /**
   * Вывести компонент.
   * @return {*} Представление.
   */
  render() {
    return (
      <Centrifuge secret={secret} url={url} user={user}>
        <Subscribe channel="test" handleMessage={console.log} />
      </Centrifuge>
    );
  }

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
   * @param {*} props Новые свойства.
   * @param {*} state Новое состояние.
   * @return {boolean} Должен ли компонент обновиться?
   */
  // shouldComponentUpdate(props, state) {}

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

export default ExampleSocket;
