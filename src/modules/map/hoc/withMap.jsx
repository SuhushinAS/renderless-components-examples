import {MapContext} from 'modules/map/context/MapContext.js';
import React from 'react';

export default function withMap(Component) {
  return class ComponentWithMap extends React.Component {
    renderComponent = (context) => <Component {...this.props} {...context} />;

    render() {
      return <MapContext.Consumer>{this.renderComponent}</MapContext.Consumer>;
    }
  };
}
