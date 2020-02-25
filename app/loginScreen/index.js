import {Observable, Subject, combineLatest, merge} from 'rxjs';
import React, {useEffect} from 'react';
import * as RxOperations from 'rxjs/operators';

import RxButton from './RxButton';
import RxText from './RxText';
import RxTextInput from './RxTextInput';
import login$ from './login$';

const LoginForm = ({}: {}) => {
  let errorMessage = new Subject();
  let userName$: Observable<string> = null;
  let password$: Observable<string> = null;

  let onPressObsevable: Observable<{}> = null;
  let disable$ = new Subject();

  useEffect(() => {
    combineLatest(userName$, password$)
      .pipe(
        // //1
        // RxOperations.skip(1),
        // // 2
        // RxOperations.throttleTime(100),
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
        // //3
        // RxOperations.throttleTime(2000),
        // // 4.1
        // RxOperations.tap(() => {
        //   errorMessage.next('loading text');
        //   disable$.next(true);
        // }),
        RxOperations.withLatestFrom(combineLatest(userName$, password$)),
        RxOperations.flatMap(([onPress, userName, passsword]) => {
          return login$(userName, passsword);
        }),
        // 4.2
        // RxOperations.tap(() => {
        //   errorMessage.next('');
        //   disable$.next(false);
        // }),
      )
      .subscribe(result => {
        alert('login stauts ', result.isSuccess);
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
