// @flow

import {Observable} from 'rxjs';

import {searchText} from './doSomeThing';

const searchTextObservable = (text: string): Observable<Object> => {
  return Observable.create(function(obsever) {
    var isCancel = false;

    searchText(text, data => {
      if (!isCancel) {
        obsever.next(data);
        obsever.complete();
      }
    });
    return () => {
      isCancel = true;
    };
  });
};

export {searchTextObservable};
