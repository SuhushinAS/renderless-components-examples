import {SocketContext} from 'modules/centrifuge/context/SocketContext.js';
import React from 'react';

/**
 * Передать map в компонент.
 * @param {*} Component Компонент.
 * @return {*} Компонент.
 */
export default function withSocket(Component) {
  return class ComponentWithSocket extends React.Component {
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
      return <SocketContext.Consumer>{this.renderComponent}</SocketContext.Consumer>;
    }
  };
}
