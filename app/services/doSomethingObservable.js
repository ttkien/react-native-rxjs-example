// @flow

import {Observable} from 'rxjs';

import {searchText} from './doSomeThing';

const searchTextObservable = (text: string): Observable<Object> => {
  return Observable.create(function(obsever) {
    const timer = searchText(text, data => {
      obsever.next(data);
      obsever.complete();
    });
    return () => {
      // console.log('cancel key', text);
      clearTimeout(timer);
    };
  });
};

export {searchTextObservable};
