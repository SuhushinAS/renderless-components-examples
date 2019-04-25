import connect from 'data/connect.json';
import geoJSON from 'data/geo-json.json';
import tile from 'data/tile.json';
import ExampleSocketMap
  from 'modules/example-socket/components/ExampleSocketMap.jsx';
import React from 'react';

class ExampleSocket extends React.Component {
  render() {
    return (
      <ExampleSocketMap
        connect={connect}
        geoJSON={geoJSON}
        tile={tile.Stamen}
      />
    );
  }
}

export default ExampleSocket;
