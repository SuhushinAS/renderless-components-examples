import geoJSONData from 'modules/example-map/data/geo-json.json';
import tileLayerData from 'modules/example-map/data/tile-layer.json';
import ExampleSocketMain
  from 'modules/example-socket/components/ExampleSocketMain.jsx';
import connectData from 'modules/example-socket/data/connect.json';
import React from 'react';

class ExampleSocket extends React.Component {
  render() {
    return (
      <ExampleSocketMain
        connectData={connectData}
        geoJSONData={geoJSONData}
        tileLayer={tileLayerData.Stamen}
      />
    );
  }
}

export default ExampleSocket;
