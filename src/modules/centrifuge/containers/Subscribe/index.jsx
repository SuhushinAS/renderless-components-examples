import Message from 'modules/centrifuge/containers/Message/index.jsx';
import {centrifugeActionMessagePush} from 'modules/centrifuge/ducks/index.es';
import centrifuge from 'modules/centrifuge/helpers/Centrifuge/index.es';
import {centrifugeSelectorConnectionStatus} from 'modules/centrifuge/selectors/index.es';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';

class Subscribe extends React.Component {
    /**
     * Значения свойств по-умолчанию.
     * https://facebook.github.io/react/docs/typechecking-with-proptypes.html
     */
    static defaultProps = {
        additional: '',
    };

    /**
     * Получить название канала.
     * @param {string} additional Дополнительные параметры.
     * @param {string} channel Канал.
     * @return {string} Название канала.
     */
    static getChannelName({additional, channel}) {
        const resultList = [channel];

        if (additional) {
            resultList.push(additional);
        }

        return resultList.join('_');
    }

    /**
     * Конструктор компонента.
     * @param {*} props Свойства переданые в компонент.
     * @param {*} context Контекст.
     * @return {undefined}
     */
    constructor(props, context) {
        super(props, context);
        this.eventData = {
            message: this.handleMessage,
        };
    }

    /**
     * Обработать сообщение.
     * @param {string} channel Канал.
     * @param {*} data Данные.
     * @return {undefined}
     */
    handleMessage = ({channel, data}) => {
        this.props.centrifugeActionMessagePush(channel, data, this.props.getId);
    };

    handleSubscribe = ({recovered}) => {
        const {onRecoverFail} = this.props;

        if (!recovered && 'function' === typeof onRecoverFail) {
            onRecoverFail();
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
        this.subscribe();
    }

    /**
     * Вызывается сразу перед тем, как компонент будет удален из DOM.
     * @return {undefined}
     */
    componentWillUnmount() {
        this.unsubscribe();
    }

    /**
     * Должен ли компонент обновиться?
     * На самом деле, обычно реакт сам отлично разбирается.
     * Но иногда ручное управление позволяет существенно ускорить работу в "узких местах".
     * @param {*} props Новые свойства.
     // * @param {*} state Новое состояние.
     * @return {boolean} Должен ли компонент обновиться?
     */
    shouldComponentUpdate(props) {
        const channel = Subscribe.getChannelName(props);
        const prevChannel = Subscribe.getChannelName(this.props);

        return channel !== prevChannel || !this.sub;
    }

    /**
     * Вызывается сразу после render.
     * Не вызывается в момент первого render'а компонента.
     // * @param {*} props Предыдущие свойства.
     // * @param {*} state Предыдущее состояние.
     * @return {undefined}
     */
    componentDidUpdate() {
        this.unsubscribe();
        this.subscribe();
    }

    /**
     * Подписаться.
     * @return {void}
     */
    subscribe() {
        const channel = Subscribe.getChannelName(this.props);

        if (centrifuge.isConnected() && !this.sub) {
            this.sub = centrifuge.subscribe(channel, this.eventData);
            this.sub.off('subscribe', this.handleSubscribe).on('subscribe', this.handleSubscribe);
        }
    }

    /**
     * Отписаться.
     * @return {void}
     */
    unsubscribe() {
        if (this.sub) {
            this.sub.unsubscribe();
            this.sub.removeAllListeners();
            this.sub = null;
        }
    }

    /**
     * Отображение компонента
     * @return {*} Представление компонента.
     */
    render() {
        return <Message channel={Subscribe.getChannelName(this.props)} handleData={this.props.handleData} />;
    }
}

export default compose(
    connect(
        (state) => ({
            centrifugeConnectionStatus: centrifugeSelectorConnectionStatus(state),
        }),
        {
            centrifugeActionMessagePush,
        }
    )
)(Subscribe);
