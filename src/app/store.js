import getApi from 'app/api.js';
import reducer from 'app/reducer.js';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';

export default function configureStore() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(applyMiddleware(thunk.withExtraArgument(getApi())));
  const store = createStore(reducer, enhancer);

  if (module.hot) {
    module.hot.accept('app/reducer.js', () => {
      store.replaceReducer(reducer);
    });
  }

  return store;
}
