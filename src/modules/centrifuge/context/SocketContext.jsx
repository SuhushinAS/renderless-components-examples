import React from 'react';

export const SocketContext = React.createContext(undefined);

export default function withSocket(Component) {
  return class ComponentWithSocket extends React.Component {
    renderComponent = (context) =>
      <Component {...this.props} {...context} />;

    render() {
      return <SocketContext.Consumer>{this.renderComponent}</SocketContext.Consumer>;
    }
  };
}
