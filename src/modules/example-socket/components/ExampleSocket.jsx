import geoJSON from 'modules/example-map/data/geo-json.json';
import tile from 'modules/example-map/data/tile-layer.json';
import ExampleSocketMain
  from 'modules/example-socket/components/ExampleSocketMain.jsx';
import connect from 'modules/example-socket/data/connect.json';
import React from 'react';

class ExampleSocket extends React.Component {
  render() {
    return (
      <ExampleSocketMain
        connect={connect}
        geoJSON={geoJSON}
        tile={tile.Stamen}
      />
    );
  }
}

export default ExampleSocket;
