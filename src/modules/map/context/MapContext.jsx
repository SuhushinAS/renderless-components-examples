import React from 'react';

export const MapContext = React.createContext(undefined);

export default function withMap(Component) {
  return class ComponentWithMap extends React.Component {
    renderComponent = (context) => <Component {...this.props} {...context} />;

    render() {
      return <MapContext.Consumer>{this.renderComponent}</MapContext.Consumer>;
    }
  };
}
