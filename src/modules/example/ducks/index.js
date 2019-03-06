import {createReducer} from 'app/reducer.js';

const actionTypes = {
  listGet: 'EXAMPLE__LIST-GET',
  loadStart: 'EXAMPLE__LOAD_START',
  loadStop: 'EXAMPLE__LOAD_STOP',
};

const initialState = {
  data: {},
  isLoading: false,
  more: true,
};

/**
 * Получить список.
 * @return {*} Данные для редьюсера.
 */
export function exampleActionListGet() {
  return (dispatch, getState, api) => {
    dispatch({type: actionTypes.loadStart});

    return api.example.listGet().then((response) => {
      if (0 === response.errors.length) {
        dispatch({
          payload: response.data,
          type: actionTypes.listGet,
        });

        return response;
      }

      throw new Error(response);
    }).catch((error) => {
      dispatch({type: actionTypes.loadStop});

      console.error(error);
    });
  };
}

export default createReducer(initialState, {
  [actionTypes.listGet](state, {list, more}) {
    return {
      ...state,
      data: list.reduce((prev, item) => ({
        ...prev,
        [item.id]: item,
      }), {}),
      isLoading: false,
      more,
    };
  },
  [actionTypes.loadStart](state) {
    return {
      ...state,
      isLoading: true,
    };
  },
  [actionTypes.loadStop](state) {
    return {
      ...state,
      isLoading: false,
    };
  },
});
