import React from 'react';

class KeyHandler extends React.Component {
  /**
   * Добавление слушателей нажатий клавиш.
   * @param {string} eventName Название события.
   * @return {undefined}
   */
  handlerAdd = (eventName) => {
    document.addEventListener(eventName, this.handler);
  };

  /**
   * Удаление слушателей нажатий клавиш.
   * @param {string} eventName Название события.
   * @return {undefined}
   */
  handlerRemove = (eventName) => {
    document.removeEventListener(eventName, this.handler);
  };

  /**
   * Обработчик нажатия клавиш.
   * @param {*} e Событие.
   * @return {function(*=)} Обработчик нажатия клавиш.
   */
  handler = (e) => {
    if (this.props.keyList[e.type]) {
      if (this.props.keyList[e.type][e.keyCode]) {
        this.props.keyList[e.type][e.keyCode](e);
      }
    }
  };

  /**
   * Компонент примонтировался.
   * В данный момент у нас есть возможность использовать refs,
   * а следовательно это то самое место, где мы хотели бы указать установку фокуса.
   * Так же, таймауты, ajax-запросы и взаимодействие с другими библиотеками стоит обрабатывать здесь.
   * @return {undefined}
   */
  componentDidMount() {
    Object.keys(this.props.keyList).forEach(this.handlerAdd);
  }

  /**
   * Вызывается сразу перед тем, как компонент будет удален из DOM.
   * @return {undefined}
   */
  componentWillUnmount() {
    Object.keys(this.props.keyList).forEach(this.handlerRemove);
  }

  /**
   * Должен ли компонент обновиться?
   * На самом деле, обычно реакт сам отлично разбирается.
   * Но иногда ручное управление позволяет существенно ускорить работу в "узких местах".
   * @param {*} props Новые свойства.
   // * @param {*} nextState Новое состояние.
   * @return {boolean} Должен ли компонент обновиться?
   */
  shouldComponentUpdate(props) {
    Object.keys(this.props.keyList).forEach(this.handlerRemove);
    Object.keys(props.keyList).forEach(this.handlerAdd);
    return false;
  }

  /**
   * Отображение компонента
   * @return {*} Представление компонента.
   */
  render() {
    return null;
  }
}

export default KeyHandler;
