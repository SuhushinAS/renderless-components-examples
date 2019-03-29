import {centrifugeActionConnectionGet, centrifugeActionConnectionStatusSet} from 'modules/centrifuge/ducks/index.es';
import centrifuge from 'modules/centrifuge/helpers/Centrifuge/index.es';
import {centrifugeSelectorConnectData, centrifugeSelectorConnectionStatus} from 'modules/centrifuge/selectors/index.es';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';

class Centrifuge extends React.Component {
    /**
     * Конструктор компонента.
     * @param {*} props Свойства переданые в компонент.
     * @param {*} context Контекст.
     * @return {undefined}
     */
    constructor(props, context) {
        super(props, context);
        props.centrifugeActionConnectionStatusSet('disconnected');
    }

    /**
     * Обработать подкулючение.
     * @return {undefined}
     */
    handleConnect = () => {
        this.props.centrifugeActionConnectionStatusSet('connected');
    };

    /**
     * Компонент примонтировался.
     * В данный момент у нас есть возможность использовать refs,
     * а следовательно это то самое место, где мы хотели бы указать установку фокуса.
     * Так же, таймауты, ajax-запросы и взаимодействие с другими библиотеками стоит обрабатывать здесь.
     * @return {undefined}
     */
    componentDidMount() {
        this.props.centrifugeActionConnectionGet();
        centrifuge.off('connect', this.handleConnect).on('connect', this.handleConnect);
    }

    /**
     * Вызывается сразу перед тем, как компонент будет удален из DOM.
     * @return {undefined}
     */
    componentWillUnmount() {
        centrifuge.removeAllListeners();
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
     // * @param {*} props Предыдущие свойства.
     // * @param {*} state Предыдущее состояние.
     * @return {undefined}
     */
    componentDidUpdate() {
        this.connect();
    }

    connect() {
        const {centrifugeActionConnectionStatusSet, centrifugeConnectData, centrifugeConnectionStatus} = this.props;

        if ('disconnected' === centrifugeConnectionStatus) {
            if (centrifugeConnectData) {
                centrifugeActionConnectionStatusSet('connecting');
                centrifuge.configure(centrifugeConnectData);
                centrifuge.connect();
            }
        }
    }
}

export default compose(
    connect(
        (state) => ({
            centrifugeConnectData: centrifugeSelectorConnectData(state),
            centrifugeConnectionStatus: centrifugeSelectorConnectionStatus(state),
        }),
        {
            centrifugeActionConnectionGet,
            centrifugeActionConnectionStatusSet,
        }
    )
)(Centrifuge);
