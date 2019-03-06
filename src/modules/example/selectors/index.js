import {createSelector} from 'reselect';

/**
 * Селектор.
 * @param {*} state Состояние.
 * @return {*} Ветка.
 */
export function exampleSelector(state) {
  return state.example;
}

/**
 * Селектор данных.
 * @param {*} state Состояние.
 * @return {*} Данные.
 */
export function exampleSelectorData(state) {
  return exampleSelector(state).data;
}

export const exampleSelectorList = createSelector([exampleSelectorData], (data) => Object.keys(data).map((id) => data[id]));
