import example from 'modules/example/ducks/index.js';
import {combineReducers} from 'redux';

const reducers = {
  example,
};

export default combineReducers(reducers);

/**
 * Создать редьюсер.
 * @param {*} initialState Начальное состояние.
 * @param {*} reducerList Набор редьюсеров.
 * @return {*} Редьюсер.
 */
export function createReducer(initialState, reducerList) {
  return (state = initialState, {type, payload}) => {
    const reducer = reducerList[type];

    if ('function' === typeof reducer) {
      return reducer(state, payload);
    }

    return state;
  };
}
