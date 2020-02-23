// @flow
import {Observable} from 'rxjs';

import {networkCallObservable} from '../utils/networkCallObservable';
import type ClassType from './ClassType';

const getClassByIdObservable = (id: string): Observable<ClassType> => {
  return networkCallObservable(
    'getClassByIdObservable with class' + id,
    {
      id,
      name: 'class name of ' + id,
    },
    3000,
  );
};

export {getClassByIdObservable};
