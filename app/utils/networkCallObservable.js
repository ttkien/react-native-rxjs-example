// @flow
import {Observable} from 'rxjs';

import {networkCall} from './networkCall';

const networkCallObservable = (
  requestName: string,
  reponseData: Object,
  responseTime: ?number = null,
): Observable<Object> => {
  return Observable.create(function(obsever) {
    const cancel = networkCall(
      requestName,
      reponseData,
      data => {
        obsever.next(data);
        obsever.complete();
      },
      responseTime,
    );

    return () => {
      // console.log('cancel key', text);
      cancel();
    };
  });
};

export {networkCallObservable};
