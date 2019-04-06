import history from 'app/history.js';
import If from "modules/common/containers/If/index.jsx";
import KeyHandler from "modules/common/containers/KeyHandler/index.jsx";
import ExampleMap from 'modules/example-map/containers/ExampleMap/index.jsx';
import ExampleSocket from "modules/example-socket/containers/ExampleSocket/index.jsx";
import SocketGenerator from "modules/example-socket/containers/SocketGenerator/index.jsx";
import React from 'react';
import {Redirect, Route, Switch} from "react-router";
import {Link, Router} from 'react-router-dom';
import './style.css';

const routeData = {
  'example-map': {
    component: ExampleMap,
    name: 'ExampleMap',
    path: '/example-map',
  },
  'example-socket': {
    component: ExampleSocket,
    name: 'ExampleSocket',
    path: '/example-socket',
  },
  'socket-generator': {
    component: SocketGenerator,
    name: 'SocketGenerator',
    path: '/socket-generator',
  },
};

const routeList = Object.keys(routeData);

class App extends React.Component {
  state = {
    showNav: false,
  };

  handleKey = (e) => {
    if (e.altKey) {
      this.setState(this.toggleNav)
    }
  };

  toggleNav = (state) => ({
    ...state,
    showNav: !state.showNav,
  });

  keyList = {
    keydown: {
      78: this.handleKey,
    },
  };

  render() {
    return (
      <Router history={history}>
        <div className="app">
          <If condition={this.state.showNav}>
            <div className="app__nav">
                {routeList.map(this.renderLink)}
            </div>
          </If>
          <div className="app__content">
            <Switch>
              {routeList.map(this.renderRoute)}
              <Redirect to={routeData[routeList[0]].path} />
            </Switch>
          </div>
          <KeyHandler keyList={this.keyList} />
        </div>
      </Router>
    );
  }

  renderNav() {
    return null;
  }

  renderLink = (routeId) => <Link className="app__nav-link" key={routeId} to={routeData[routeId].path}>{routeData[routeId].name}</Link>;

  renderRoute = (routeId) => <Route component={routeData[routeId].component} key={routeId} path={routeData[routeId].path} />;
}

export default App;
