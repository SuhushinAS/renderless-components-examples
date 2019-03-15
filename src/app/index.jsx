import history from 'app/browser-history.js';
import configureStore from 'app/store.js';
// import Example from 'modules/example/containers/Example/index.jsx';
import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import Map from 'modules/map/containers/Map/index.jsx';
import TileLayer from 'modules/map/containers/TileLayer/index.jsx';
import View from 'modules/map/containers/View/index.jsx';

const store = configureStore();

const view = JSON.parse('{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[444.742012,56.413901],[444.742012,56.579343],[445.170479,56.579343],[445.170479,56.413901],[444.742012,56.413901]]]}}');

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Map>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png " />
            {/*<TileLayer url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png" />*/}
            <View onViewChange={console.log} view={view} />
          </Map>
        </Router>
      </Provider>
    );
  }
}

export default App;
