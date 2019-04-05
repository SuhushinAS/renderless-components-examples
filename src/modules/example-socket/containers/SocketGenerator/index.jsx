import Centrifuge from "modules/centrifuge/containers/Centrifuge/index.jsx";
import Subscribe from "modules/centrifuge/containers/Subscribe/index.jsx";
import SocketGeneratorInner from 'modules/example-socket/containers/SocketGeneratorInner/index.jsx';
import connectData from 'modules/example-socket/data/connect.json';
import React from 'react';

class SocketGenerator extends React.Component {
  /**
   * Значения свойств по-умолчанию.
   * https://facebook.github.io/react/docs/typechecking-with-proptypes.html
   */
  static defaultProps = {
    user: 'user',
  };

  /**
   * Вывести компонент.
   * @return {*} Представление.
   */
  render() {
    return (
      <Centrifuge secret={connectData.secret} url={connectData.url} user={this.props.user}>
        <Subscribe channel="userstory-to-devpro">
          <SocketGeneratorInner />
        </Subscribe>
      </Centrifuge>
    );
  }
}

export default SocketGenerator;
