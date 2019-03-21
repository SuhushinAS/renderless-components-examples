import history from 'app/browser-history.js';
import configureStore from 'app/store.js';
import React from 'react';
import {Provider} from 'react-redux';
import {Link, Router} from 'react-router-dom';
import ExampleMapTile from 'modules/example-map/containers/ExampleMapTile/index.jsx';
import ExampleMapView from 'modules/example-map/containers/ExampleMapView/index.jsx';
import {Redirect, Route, Switch} from "react-router";
import './style.css';

const store = configureStore();

const routeData = {
  'example-map-tile': {
    component: ExampleMapTile,
    path: '/example-map-tile',
  },
  'example-map-view': {
    component: ExampleMapView,
    path: '/example-map-view',
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

  renderLink = (routeId) => <Link className="app__nav-link" key={routeId} to={routeData[routeId].path}>{routeData[routeId].component.name}</Link>;

  renderRoute = (routeId) => <Route component={routeData[routeId].component} key={routeId} path={routeData[routeId].path} />;
}

export default App;
