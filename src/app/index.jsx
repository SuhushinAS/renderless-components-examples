import history from 'app/browser-history.js';
import configureStore from 'app/store.js';
// import Example from 'modules/example/containers/Example/index.jsx';
import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import ExampleMap from 'modules/example-map/containers/ExampleMap/index.jsx';
import {Redirect, Route, Switch} from "react-router";

const store = configureStore();

const routeData = {
  'map': {
    component: ExampleMap,
    path: '/map',
  },
};

const routeList = ['map'];

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            {routeList.map(this.renderRoute)}
            <Redirect to={routeData[routeList[0]].path} />
          </Switch>
        </Router>
      </Provider>
    );
  }

  renderRoute = (routeId) => <Route component={routeData[routeId].component} key={routeId} path={routeData[routeId].path} />;
}

export default App;
