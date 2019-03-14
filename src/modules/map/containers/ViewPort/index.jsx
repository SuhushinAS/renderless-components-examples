import L from 'leaflet';
import React from 'react';
import withMap from "../../hoc/withMap";

class ViewPort extends React.Component {
    /**
     * Получить "очищеные" координаты границ.
     * @param {*} bounds Границы.
     * @return {*} Границы.
     */
    static getBoundsClean(bounds) {
        const nextBounds = ViewPort.getBoundsNext(bounds);

        if (nextBounds.equals(bounds)) {
            return bounds;
        }

        return ViewPort.getBoundsClean(nextBounds);
    }

    /**
     * Сделать цикл: bounds->layer->geoJSON->bounds для "очистки" координат границ.
     * @param {*} bounds Границы.
     * @return {undefined}
     */
    static getBoundsNext(bounds) {
        const rectangle = L.rectangle(bounds);
        const geoJSON = rectangle.toGeoJSON();
        const layer = L.geoJSON(geoJSON);

        return layer.getBounds();
    }

    /**
     * Обработчик смены положения карты
     * @return {undefined}
     */
    handleViewChange = () => {
        const {onViewChange, leaflet, mapView} = this.props;
        const layer = L.geoJSON(mapView);
        const prevBounds = layer.getBounds();

        if (leaflet && onViewChange) {
            const bounds = ViewPort.getBoundsClean(leaflet.getBounds());

            if (!bounds.equals(prevBounds)) {
                const rectangle = L.rectangle(bounds);
                const geoJSON = rectangle.toGeoJSON();

                onViewChange(geoJSON);
            }
        }
    };

    /**
     * Компонент примонтировался.
     * В данный момент у нас есть возможность использовать refs,
     * а следовательно это то самое место, где мы хотели бы указать установку фокуса.
     * Так же, таймауты, ajax-запросы и взаимодействие с другими библиотеками стоит обрабатывать здесь.
     * @return {undefined}
     */
    componentDidMount() {
        const {onViewChange, leaflet, mapView} = this.props;

        if (leaflet) {
            if (mapView) {
                const mapLayer = L.geoJSON(mapView);
                const mapBounds = ViewPort.getBoundsClean(mapLayer.getBounds());

                leaflet.fitBounds(mapBounds);
            } else {
                leaflet.fitWorld({padding: [0, 0]});
                if (onViewChange) {
                    const rectangle = L.rectangle(leaflet.getBounds());
                    const geoJSON = rectangle.toGeoJSON();

                    onViewChange(geoJSON);
                }
            }

            if (onViewChange) {
                leaflet.off('moveend zoomend', this.handleViewChange).on('moveend zoomend', this.handleViewChange);
            }
        }
    }

    /**
     * Вызывается сразу перед тем, как компонент будет удален из DOM.
     * @return {undefined}
     */
    componentWillUnmount() {
        const {leaflet} = this.props;

        if (leaflet) {
            leaflet.off('moveend zoomend', this.handleViewChange);
        }
    }

    /**
     * Перейти к виду
     * @param {*} mapView Вид.
     * @return {undefined}
     */
    flyTo(mapView) {
        const {leaflet} = this.props;
        const layer = L.geoJSON(mapView);
        const bounds = layer.getBounds();

        if (leaflet && !bounds.equals(leaflet.getBounds())) {
            leaflet.fitBounds(bounds);
        }
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
        const {mapView} = this.props;

        if (mapView && mapView !== props.mapView) {
            const layer = L.geoJSON(mapView);
            const bounds = layer.getBounds();
            const prevLayer = L.geoJSON(props.mapView);
            const prevBounds = prevLayer.getBounds();

            if (!bounds.equals(prevBounds)) {
                this.flyTo(mapView);
            }
        }
    }
}

export default withMap(ViewPort);
