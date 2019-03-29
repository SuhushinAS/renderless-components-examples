import BaseApi from 'api/BaseApi';

export default class CentrifugeApi extends BaseApi {
    connectionGet() {
        return this.request('/api/v1/centrifugo/init', 'GET', {
            isCors: true,
        });
    }
}
