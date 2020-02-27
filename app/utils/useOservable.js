// @flow
import {Observable} from 'rxjs';
import {useEffect, useState} from 'react';

const useObservable = <T>(observable: Observable<T>) => {
  const [state, setState] = useState();
  useEffect(() => {
    observable.subscribe(setState);
    return () => {
      observable.unsubscribe();
    };
  }, [observable]);
  return state;
};

export default useObservable;
