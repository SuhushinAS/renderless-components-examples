import {MapContext} from 'modules/map/context/MapContext.js';
import React from 'react';

/**
 * Передать map в компонент.
 * @param {*} Component Компонент.
 * @return {*} Компонент.
 */
export default function withMap(Component) {
  return class ComponentWithMap extends React.Component {
    /**
     * Вывести детей.
     * @param {number} context Контекст.
     * @return {*} Представление.
     */
    renderComponent = (context) => <Component {...this.props} {...context} />;

    /**
     * Отображение компонента
     * @return {*} Представление компонента.
     */
    render() {
      return <MapContext.Consumer>{this.renderComponent}</MapContext.Consumer>;
    }
  };
}
