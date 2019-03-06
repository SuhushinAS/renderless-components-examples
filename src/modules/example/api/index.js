import Api from 'api/index.js';

export default class ExampleApi extends Api {
  listGet(filter = null, limit = 0, offset = 0) {
    return this.request('/api/v1/example', 'GET', {
      data: {
        filter,
        limit,
        offset,
      },
      isCors: false,
    });
  }
}
