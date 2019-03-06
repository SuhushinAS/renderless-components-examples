import history from 'app/browser-history.js';
import configureStore from 'app/store.js';
import Example from 'modules/example/containers/Example/index.jsx';
import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';

const store = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Example />
        </Router>
      </Provider>
    );
  }
}

export default App;
