import {createSelector} from 'reselect';

/**
 * Селектор.
 * @param {*} state Состояние.
 * @return {*} Ветка.
 */
export function centrifugeSelector(state) {
    return state.centrifuge;
}

/**
 * Селектор данных.
 * @param {*} state Состояние.
 * @return {*} Данные.
 */
export function centrifugeSelectorData(state) {
    return centrifugeSelector(state).data;
}

/**
 * Селектор данных.
 * @param {*} state Состояние.
 * @param {string} channel Канал.
 * @return {*} Данные.
 */
export function centrifugeSelectorChannel(state, channel) {
    return (
        centrifugeSelectorData(state)[channel] || {
            data: {},
            list: [],
        }
    );
}

/**
 * Селектор данных.
 * @param {*} state Состояние.
 * @param {string} channel Канал.
 * @return {*} Данные.
 */
export function centrifugeSelectorChannelData(state, channel) {
    return centrifugeSelectorChannel(state, channel).data;
}

/**
 * Селектор данных.
 * @param {*} state Состояние.
 * @param {string} channel Канал.
 * @return {*} Данные.
 */
export function centrifugeSelectorChannelList(state, channel) {
    return centrifugeSelectorChannel(state, channel).list;
}

export const centrifugeSelectorList = createSelector(
    [centrifugeSelectorChannelList, centrifugeSelectorChannelData],
    centrifugeList
);

/**
 * Получить список данных.
 * @param {*} list Список идентификаторов.
 * @param {*} data Данные.
 * @return {*} Список данных.
 */
function centrifugeList(list, data) {
    return list.map((id) => data[id]);
}

/**
 * Селектор данных.
 * @param {*} state Состояние.
 * @return {*} Данные.
 */
export function centrifugeSelectorConnectData(state) {
    return centrifugeSelector(state).connectData;
}

/**
 * Селектор данных.
 * @param {*} state Состояние.
 * @return {*} Данные.
 */
export function centrifugeSelectorConnectionStatus(state) {
    return centrifugeSelector(state).connectionStatus;
}

/**
 * Селектор данных.
 * @param {*} state Состояние.
 * @return {*} Данные.
 */
export function centrifugeSelectorIsProcessing(state) {
    return centrifugeSelector(state).isProcessing;
}
