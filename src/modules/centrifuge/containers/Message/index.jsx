import {centrifugeActionMessageProcess} from 'modules/centrifuge/ducks/index.es';
import {centrifugeSelectorIsProcessing, centrifugeSelectorList} from 'modules/centrifuge/selectors/index.es';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';

class Message extends React.Component {
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
        const {centrifugeActionMessageProcess, centrifugeList, centrifugeIsProcessing, channel, handleData} = this.props;

        if (!centrifugeIsProcessing && 0 < centrifugeList.length) {
            centrifugeActionMessageProcess(channel, handleData);
        }
    }
}

export default compose(
    connect(
        (state, props) => ({
            centrifugeIsProcessing: centrifugeSelectorIsProcessing(state),
            centrifugeList: centrifugeSelectorList(state, props.channel),
        }),
        {
            centrifugeActionMessageProcess,
        }
    )
)(Message);
