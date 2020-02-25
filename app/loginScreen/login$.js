// @flow
import {Observable} from 'rxjs';

import {networkCallObservable} from '../utils/networkCallObservable';

type LoginResult = {
  isSuccess: true,
};
const loginObservable = (
  username: string,
  password: string,
): Observable<LoginResult> => {
  return networkCallObservable(
    'loginObservable with username ${username} and password ${password}',
    {
      isSuccess: true,
    },
    3000,
  );
};

export default loginObservable;
