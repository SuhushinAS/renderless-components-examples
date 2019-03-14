import {MapContext} from 'modules/map/context/index.js';
import React from 'react';

/**
 * Передать map в компонент.
 * @param {*} Component Компонент.
 * @return {*} Компонент.
 */
export default function withMap(Component) {
    return class ComponentWithLeaflet extends React.Component {
        /**
         * Вывести детей.
         * @param {number} leaflet Дата.
         * @return {*} Представление.
         */
        renderComponent = (leaflet) => <Component {...this.props} leaflet={leaflet} />;

        /**
         * Отображение компонента
         * @return {*} Представление компонента.
         */
        render() {
            return <MapContext.Consumer>{this.renderComponent}</MapContext.Consumer>;
        }
    };
}
