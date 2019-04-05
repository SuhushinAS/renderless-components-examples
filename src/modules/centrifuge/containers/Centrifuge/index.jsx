import CentrifugeJS from 'centrifuge';
import JsSHA from 'jssha';
import {SocketContext} from "modules/centrifuge/context/index.js";
import React from 'react';

class Centrifuge extends React.Component {
  state = {
    centrifuge: new CentrifugeJS(),
  };

  static get timestamp() {
    return Math.round(Date.now() / 1000).toString();
  }

  get connectData() {
    const {secret, url, user} = this.props;
    const timestamp = Centrifuge.timestamp;
    const token = Centrifuge.getToken(user, secret, timestamp);

    return {
      timestamp,
      token,
      url,
      user,
    };
  }

  static getToken(user, secret, timestamp) {
    const hmacBody = `${user}${timestamp}`;
    const shaObj = new JsSHA("SHA-256", "TEXT");
    shaObj.setHMACKey(secret, "TEXT");
    shaObj.update(hmacBody);
    return shaObj.getHMAC("HEX");
  }

  /**
   * Отображение компонента
   * @return {*} Представление компонента.
   */
  render() {
    return (
      <SocketContext.Provider value={this.state}>
        {this.props.children}
      </SocketContext.Provider>
    );
  }

  /**
   * Компонент примонтировался.
   * В данный момент у нас есть возможность использовать refs,
   * а следовательно это то самое место, где мы хотели бы указать установку фокуса.
   * Так же, таймауты, ajax-запросы и взаимодействие с другими библиотеками стоит обрабатывать здесь.
   * @return {undefined}
   */
  componentDidMount() {
    this.connect();
  }

  connect() {
    const {centrifuge} = this.state;
    if (centrifuge.isDisconnected()) {
      centrifuge.configure(this.connectData);
      centrifuge.connect();
    }
  }

  /**
   * Вызывается сразу перед тем, как компонент будет удален из DOM.
   * @return {undefined}
   */
  componentWillUnmount() {
    this.disconnect();
  }

  disconnect() {
    const {centrifuge} = this.state;
    centrifuge.removeAllListeners();
    centrifuge.disconnect();
  }
}

export default Centrifuge;
