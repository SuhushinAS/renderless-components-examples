import Centrifuge from "modules/centrifuge/containers/Centrifuge/index.jsx";
import Subscribe from 'modules/centrifuge/containers/Subscribe/index.jsx';
import React from 'react';

const secret = 'secret';
const url = 'https://centrifugo.herokuapp.com/connection/websocket';
const user = 'user';

class ExampleSocket extends React.Component {
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
}

export default ExampleSocket;
