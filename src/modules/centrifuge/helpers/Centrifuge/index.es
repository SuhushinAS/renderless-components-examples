import * as CentrifugeJS from 'centrifuge';

class MyCentrifugeJS extends CentrifugeJS {
    _subscribeResponse({body: {last, ...body}, ...message}) {
        if (last) {
            body.last = last;
        }

        return super._subscribeResponse({
            body,
            ...message,
        });
    }
}

export default new MyCentrifugeJS();
