import history from 'app/history.js';
import configureStore from 'app/store.js';
import ExampleKey from 'modules/example-key/containers/ExampleKey/index.jsx';
import ExampleMap from 'modules/example-map/containers/ExampleMap/index.jsx';
import React from 'react';
import {Provider} from 'react-redux';
import {Redirect, Route, Switch} from "react-router";
import {Link, Router} from 'react-router-dom';
import './style.css';

const store = configureStore();

const routeData = {
  'example-key': {
    component: ExampleKey,
    name: 'ExampleKey',
    path: '/example-key',
  },
  'example-map': {
    component: ExampleMap,
    name: 'ExampleMap',
    path: '/example-map',
  },
};

const routeList = Object.keys(routeData);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div className="app">
            <div className="app__nav">
                {routeList.map(this.renderLink)}
            </div>
            <div className="app__content">
              <Switch>
                {routeList.map(this.renderRoute)}
                <Redirect to={routeData[routeList[0]].path} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }

  renderLink = (routeId) => <Link className="app__nav-link" key={routeId} to={routeData[routeId].path}>{routeData[routeId].name}</Link>;

  renderRoute = (routeId) => <Route component={routeData[routeId].component} key={routeId} path={routeData[routeId].path} />;
}

export default App;
