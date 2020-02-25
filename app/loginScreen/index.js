import {Observable, Subject, combineLatest} from 'rxjs';
import React, {useEffect} from 'react';
import * as RxOperations from 'rxjs/operators';

import login$ from './login$';
import RxButton from './RxButton';
import RxText from './RxText';
import RxTextInput from './RxTextInput';

const LoginForm = ({}: {}) => {
  let userName$: Observable<string> = null;
  let password$: Observable<string> = null;
  let errorMessage = new Subject();
  let onPressObsevable: Observable<{}> = null;
  let disable$ = new Subject();

  useEffect(() => {
    combineLatest(userName$, password$)
      .pipe(
        RxOperations.throttleTime(100),
        RxOperations.map(
          ([username, passsword]): string => {
            return username.length >= 6 && passsword.length >= 6
              ? ''
              : 'username password > 6';
          },
        ),
      )
      .subscribe(message => {
        errorMessage.next(message);
        disable$.next(message.length > 0);
      });

    onPressObsevable
      .pipe(
        RxOperations.throttleTime(2000),
        RxOperations.withLatestFrom(combineLatest(userName$, password$)),
        RxOperations.flatMap(([onPress, userName, passsword]) => {
          return login$(userName, passsword);
        }),
      )
      .subscribe(() => {
        alert('login');
      });
    return () => {};
  });
  return (
    <>
      <RxTextInput
        text$={text$ => {
          userName$ = text$;
        }}
      />
      <RxTextInput
        text$={text$ => {
          password$ = text$;
        }}
      />
      <RxText
        value={errorMessage}
        style={{
          color: 'red',
        }}
      />
      <RxButton
        title="Login"
        disable$={disable$}
        onPress$={obsevable => {
          onPressObsevable = obsevable;
        }}
      />
    </>
  );
};

export default LoginForm;
