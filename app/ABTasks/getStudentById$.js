// @flow
import {Observable} from 'rxjs';

import {networkCallObservable} from '../utils/networkCallObservable';
import type StudentType from './StudentType';

const getStudentByIdObservable = (id: string): Observable<StudentType> => {
  return networkCallObservable(
    'getStudentByIdObservable with student' + id,
    {
      id,
      name: 'student name of ' + id,
    },
    5000,
  );
};

export default getStudentByIdObservable;
