import withSocket from "modules/centrifuge/hoc/withSocket/index.jsx";
import React from 'react';

class Subscribe extends React.Component {
  /**
   * Обработать сообщение.
   * @param {string} channel Канал.
   * @param {*} data Данные.
   * @return {undefined}
   */
  handleMessage = ({data}) => {
    this.props.handleMessage(data);
  };

  eventData = {
    message: this.handleMessage,
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
    this.subscribe();
  }

  /**
   * Должен ли компонент обновиться?
   * На самом деле, обычно реакт сам отлично разбирается.
   * Но иногда ручное управление позволяет существенно ускорить работу в "узких местах".
   * @param {*} props Новые свойства.
   // * @param {*} state Новое состояние.
   * @return {boolean} Должен ли компонент обновиться?
   */
  shouldComponentUpdate(props) {
    return props.channel !== this.props.channel || !this.subscription;
  }

  /**
   * Вызывается сразу после render.
   * Не вызывается в момент первого render'а компонента.
   // * @param {*} props Предыдущие свойства.
   // * @param {*} state Предыдущее состояние.
   * @return {undefined}
   */
  componentDidUpdate() {
    this.unsubscribe();
    this.subscribe();
  }

  /**
   * Подписаться.
   * @return {void}
   */
  subscribe() {
    const {centrifuge, channel} = this.props;

    if (centrifuge.isConnected() && !this.subscription) {
      this.subscription = centrifuge.subscribe(channel, this.eventData);
    }
  }

  /**
   * Отписаться.
   * @return {void}
   */
  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription.removeAllListeners();
      this.subscription = null;
    }
  }

  /**
   * Вызывается сразу перед тем, как компонент будет удален из DOM.
   * @return {undefined}
   */
  componentWillUnmount() {
    this.unsubscribe();
  }
}

export default withSocket(Subscribe);
