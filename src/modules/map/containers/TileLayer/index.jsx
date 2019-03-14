import L from 'leaflet';
import React from 'react';
import withMap from 'modules/map/hoc/withMap/index.jsx';

class TileLayer extends React.Component {
    /**
     * Компонент примонтировался.
     * В данный момент у нас есть возможность использовать refs,
     * а следовательно это то самое место, где мы хотели бы указать установку фокуса.
     * Так же, таймауты, ajax-запросы и взаимодействие с другими библиотеками стоит обрабатывать здесь.
     * @return {undefined}
     */
    componentDidMount() {
        this.tileLayerAdd();
    }

    /**
     * Вызывается сразу перед тем, как компонент будет удален из DOM.
     * @return {undefined}
     */
    componentWillUnmount() {
        this.tileLayerDelete();
    }

    /**
     * Должен ли компонент обновиться?
     * На самом деле, обычно реакт сам отлично разбирается.
     * Но иногда ручное управление позволяет существенно ускорить работу в "узких местах".
     // * @param {*} nextProps - Новые свойства.
     // * @param {*} nextState - Новое состояние.
     * @return {boolean} Должен ли компонент обновиться?
     */
    shouldComponentUpdate() {
        return false;
    }

    /**
     * Добавить слой.
     * @return {undefined}
     */
    tileLayerAdd() {
        const {leaflet, params, url} = this.props;

        if (leaflet) {
            this.tileLayer = new L.TileLayer(url, params);
            leaflet.addLayer(this.tileLayer);
        }
    }

    /**
     * Удалить слой.
     * @return {undefined}
     */
    tileLayerDelete() {
        const {leaflet} = this.props;

        if (leaflet) {
            leaflet.removeLayer(this.tileLayer);
        }
    }

    /**
     * Отображение компонента
     * @return {*} Представление компонента.
     */
    render() {
        return null;
    }
}

export default withMap(TileLayer);
