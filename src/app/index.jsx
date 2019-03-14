import history from 'app/browser-history.js';
import configureStore from 'app/store.js';
// import Example from 'modules/example/containers/Example/index.jsx';
import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import Map from 'modules/map/containers/Map/index.jsx';
import TileLayer from 'modules/map/containers/TileLayer/index.jsx';
import ViewPort from 'modules/map/containers/ViewPort/index.jsx';

const store = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Map>
            <TileLayer url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png" />
            <ViewPort />
          </Map>
        </Router>
      </Provider>
    );
  }
}

export default App;
