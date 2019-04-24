import CentrifugeJS from 'centrifuge';
import JsSHA from 'jssha';
import {SocketContext} from 'modules/centrifuge/context/SocketContext.jsx';
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
    const shaObj = new JsSHA('SHA-256', 'TEXT');
    shaObj.setHMACKey(secret, 'TEXT');
    shaObj.update(hmacBody);
    return shaObj.getHMAC('HEX');
  }

  render() {
    return (
      <SocketContext.Provider value={this.state}>
        {this.props.children}
      </SocketContext.Provider>
    );
  }

  componentDidMount() {
    this.connect();
  }

  componentWillUnmount() {
    this.disconnect();
  }

  connect() {
    const {centrifuge} = this.state;
    if (centrifuge.isDisconnected()) {
      centrifuge.configure(this.connectData);
      centrifuge.connect();
    }
  }

  disconnect() {
    const {centrifuge} = this.state;
    centrifuge.removeAllListeners();
    centrifuge.disconnect();
  }
}

export default Centrifuge;
