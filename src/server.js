const Client = require('jscent');
const connectData = require('./modules/example-socket/data/connect.json');
const geoJSONData = require('./modules/example-map/data/geo-json.json');

class PathGenerator {
  constructor(connectData, path) {
    this.client = new Client(connectData);
    this.coordinates = path.coordinates;
    this.length = this.coordinates.length;
    this.interval = 500;
    this.position = 0;
    this.timeout = undefined;
    this.tick = this.tick.bind(this);
    this.start();
  };

  start() {
    this.tick();
  }

  pause() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  }

  stop() {
    this.pause();
    this.position = 0;
  }

  tick() {
    if (this.position < this.length) {
      this.timeout = setTimeout(this.tick, this.interval);
      this.proccess();
      this.position++;
    }
  }

  proccess() {
    const point = this.coordinates[this.position];
    this.client.publish("userstory-to-devpro", point);
  }

  format(coordinates) {
    return {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates,
      }
    };
  }
}

new PathGenerator(connectData, geoJSONData.Path);
