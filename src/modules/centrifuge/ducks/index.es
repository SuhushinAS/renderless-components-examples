import merge from 'deepmerge';
import {actionHandlerDefault, defaultReducer} from 'helpers/ducks.es';
import {centrifugeSelectorList} from 'modules/centrifuge/selectors/index.es';
import {commonActionLoadingInc, handleUpdateFail, handleUpdateSuccess} from 'modules/common/ducks/index.es';

const centrifugeConst = {
    connectionGetFail: 'CENTRIFUGE__CONNECTION-GET_FAIL',
    connectionGetStart: 'CENTRIFUGE__CONNECTION-GET_START',
    connectionGetSuccess: 'CENTRIFUGE__CONNECTION-GET_SUCCESS',

    connectionStatusSet: 'CENTRIFUGE__CONNECTION-STATUS_SET',

    messageProcessStart: 'CENTRIFUGE__MESSAGE-PROCESS_START',
    messageProcessSuccess: 'CENTRIFUGE__MESSAGE-PROCESS_SUCCESS',

    messagePush: 'CENTRIFUGE__MESSAGE-PUSH',
};

const initialState = {
    connectData: null,
    connectionStatus: 'disconnected',
    data: {},
    fail: false,
    isLoading: false,
    isProcessing: false,
};

const defaultCount = 100;
const defaultDelay = 300;

/**
 * Получить данные.
 * @return {*} Данные для редьюсера.
 */
export function centrifugeActionConnectionGet() {
    return (dispatch, getState, api) => {
        dispatch({type: centrifugeConst.connectionGetStart});

        return api.centrifugeApi
            .connectionGet()
            .then(handleUpdateSuccess(dispatch, centrifugeConst.connectionGetSuccess))
            .catch(handleUpdateFail(dispatch, centrifugeConst.connectionGetFail, actionHandlerDefault));
    };
}

/**
 * Установить статус.
 * @param {string} connectionStatus Статус.
 * @return {*} Функция, которая вызывает изменения состояния.
 */
export function centrifugeActionConnectionStatusSet(connectionStatus) {
    return {
        payload: {connectionStatus},
        type: centrifugeConst.connectionStatusSet,
    };
}

/**
 * Экшн для получения списка.
 * @param {string} channel Канал.
 * @param {*} handleData Обработчики.
 * @param {number} count Количество.
 * @return {{payload: {channel: *, data: *}, type: string}} Функция, которая вызывает изменения состояния.
 */
export function centrifugeActionMessageProcess(channel, handleData, count = defaultCount) {
    return (dispatch, getState) => {
        dispatch({type: centrifugeConst.messageProcessStart});
        setTimeout(() => {
            const list = centrifugeSelectorList(getState(), channel).slice(0, count);
            const listByMethod = list.reduce(
                (prev, item) => ({
                    ...prev,
                    [item.method]: [...(prev[item.method] || []), item.data],
                }),
                {}
            );

            Object.keys(listByMethod).forEach((method) => {
                const handle = handleData[method];

                if (handle) {
                    handle(listByMethod[method]);
                }
            });
            dispatch({
                payload: {
                    channel,
                    count: list.length,
                },
                type: centrifugeConst.messageProcessSuccess,
            });
        }, defaultDelay);
    };
}

/**
 * Экшн для получения списка.
 * @param {string} channel Канал.
 * @param {*} list Данные.
 * @param {*} getId Метод.
 * @return {{payload: {channel: *, data: *}, type: string}} Функция, которая вызывает изменения состояния.
 */
export function centrifugeActionMessagePush(channel, list, getId) {
    let centrifugeMessageBuffer = [];

    if (Array.isArray(list.data)) {
        centrifugeMessageBuffer = list.data.map((item) => ({
            data: item,
            method: list.method,
        }));
    } else {
        centrifugeMessageBuffer = [list];
    }

    return {
        payload: {
            channel,
            getId,
            list: centrifugeMessageBuffer,
        },
        type: centrifugeConst.messagePush,
    };
}

const centrifugeReducerGet = {
    [centrifugeConst.connectionGetFail](state) {
        return {
            ...state,
            fail: true,
            isLoading: false,
        };
    },
    [centrifugeConst.connectionGetStart](state) {
        return {
            ...state,
            isLoading: true,
        };
    },
    [centrifugeConst.connectionGetSuccess](state, payload) {
        return {
            ...state,
            connectData: payload.data,
            isLoading: true,
        };
    },
};

const centrifugeReducerConnectionStatus = {
    [centrifugeConst.connectionStatusSet]: (state, payload) => ({
        ...state,
        connectionStatus: payload.connectionStatus,
    }),
};

const centrifugeReducerMessage = {
    [centrifugeConst.messageProcessStart]: (state) => ({
        ...state,
        isProcessing: true,
    }),
    [centrifugeConst.messageProcessSuccess]: (state, payload) => {
        const channel = state.data[payload.channel] || {
            data: {},
            list: [],
        };
        const list = channel.list.slice(payload.count);

        return {
            ...state,
            data: {
                ...state.data,
                [payload.channel]: {
                    data: list.reduce(
                        (prev, key) => ({
                            ...prev,
                            [key]: channel.data[key],
                        }),
                        {}
                    ),
                    list,
                },
            },
            isProcessing: false,
        };
    },
    [centrifugeConst.messagePush]: (state, payload) => {
        const channel = state.data[payload.channel] || {
            data: {},
            list: [],
        };

        const list = [...channel.list, ...payload.list.map((item) => payload.getId(item.data))];
        const set = new Set(list);

        return {
            ...state,
            data: {
                ...state.data,
                [payload.channel]: {
                    ...channel,
                    data: {
                        ...payload.list.reduce((prev, item) => {
                            const itemId = payload.getId(item.data);

                            if ('update' === item.method) {
                                const prevItem = prev[itemId] || {};

                                return {
                                    ...prev,
                                    [itemId]: merge(prevItem, item),
                                };
                            }

                            return {
                                ...prev,
                                [itemId]: item,
                            };
                        }, channel.data),
                    },
                    list: [...set],
                },
            },
        };
    },
};

/**
 * Редьюсер - обновляет состояние в зависимости от действия.
 * @param {*} state Предыдущее состяние.
 * @param {string} type Название действия.
 * @param {*} payload Дополнительные данные для действия.
 * @returns {*} Функция для обновления состояния.
 */
export default defaultReducer(initialState, {
    ...centrifugeReducerGet,
    ...centrifugeReducerConnectionStatus,
    ...centrifugeReducerMessage,
});
