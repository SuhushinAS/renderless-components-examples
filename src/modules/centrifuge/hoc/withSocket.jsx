import {SocketContext} from 'modules/centrifuge/context/SocketContext.js';
import React from 'react';

export default function withSocket(Component) {
  return class ComponentWithSocket extends React.Component {
    renderComponent = (context) => <Component {...this.props} {...context} />;

    render() {
      return <SocketContext.Consumer>{this.renderComponent}</SocketContext.Consumer>;
    }
  };
}
