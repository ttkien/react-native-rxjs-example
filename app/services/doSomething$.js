// @flow
import {Observable} from 'rxjs';

import {searchText} from './doSomeThing';

const searchText$ = (text: string): Observable<Object> => {
  return Observable.create(function(obsever) {
    const cancel = searchText(text, data => {
      obsever.next(data);
      obsever.complete();
    });
    return () => {
      // console.log('cancel key', text);
      cancel();
    };
  });
};

export {searchText$};
