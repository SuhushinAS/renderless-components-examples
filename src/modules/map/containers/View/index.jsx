import L from 'leaflet';
import React from 'react';
import withMap from "modules/map/hoc/withMap/index.jsx";

class View extends React.Component {
    /**
     * Получить "очищеные" координаты границ.
     * @param {*} bounds Границы.
     * @return {*} Границы.
     */
    static getBoundsClean(bounds) {
        const nextBounds = View.getBoundsNext(bounds);

        if (nextBounds.equals(bounds)) {
            return bounds;
        }

        return View.getBoundsClean(nextBounds);
    }

    /**
     * Сделать цикл: bounds->layer->geoJSON->bounds для "очистки" координат границ.
     * @param {*} bounds Границы.
     * @return {undefined}
     */
    static getBoundsNext(bounds) {
        const rectangle = L.rectangle(bounds);
        const view = rectangle.toGeoJSON();

        return View.getBounds(view);
    }

    static getBounds(view) {
        return L.geoJSON(view).getBounds();
    }

    /**
     * Конструктор компонента.
     * @param {*} props Свойства переданые в компонент.
     * @return {undefined}
     */
    constructor(props) {
        super(props);
        const {leaflet, view} = props;
        leaflet.fitWorld({padding: [0, 0]});

        if (view) {
            this.flyTo(view);
        }

        leaflet.off('moveend zoomend', this.handleViewChange).on('moveend zoomend', this.handleViewChange);
    }

    /**
     * Обработать смену положения карты
     * @return {undefined}
     */
    handleViewChange = () => {
        const {leaflet} = this.props;

        if (this.props.onViewChange) {
            const bounds = View.getBoundsClean(leaflet.getBounds());
            const rectangle = L.rectangle(bounds);
            this.props.onViewChange(rectangle.toGeoJSON());
        }
    };

    /**
     * Перейти к виду
     * @param {*} view Вид.
     * @return {undefined}
     */
    flyTo(view) {
        const {leaflet} = this.props;
        const layer = L.geoJSON(view);
        const bounds = layer.getBounds();
        leaflet.fitBounds(bounds);
    }

    /**
     * Отображение компонента
     * @return {*} Представление компонента.
     */
    render() {
        return null;
    }

    /**
     * Вызывается сразу после render.
     * Не вызывается в момент первого render'а компонента.
     * @param {*} props - Предыдущие свойства.
     // * @param {*} state - Предыдущее состояние.
     * @return {undefined}
     */
    componentDidUpdate(props) {
        const {view} = this.props;

        if (view && view !== props.view) {
            const bounds = View.getBounds(view);

            if (!bounds.equals(View.getBounds(props.view))) {
                this.flyTo(view);
            }
        }
    }

    /**
     * Вызывается сразу перед тем, как компонент будет удален из DOM.
     * @return {undefined}
     */
    componentWillUnmount() {
        this.props.leaflet.off('moveend zoomend', this.handleViewChange);
    }
}

export default withMap(View);
