import {Observable, Subject, combineLatest} from 'rxjs';
import React, {useEffect} from 'react';
import * as RxOperations from 'rxjs/operators';

import {loginObservable} from './loginObservable';
import RxButton from './RxButton';
import RxText from './RxText';
import RxTextInput from './RxTextInput';

const LoginForm = ({}: {}) => {
  let userNameObservable: Observable<string> = null;
  let passwordObservable: Observable<string> = null;
  let errorMessage = new Subject();
  let onPressObsevable: Observable<{}> = null;
  let disableObservable = new Subject();

  useEffect(() => {
    combineLatest(userNameObservable, passwordObservable)
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
        disableObservable.next(message.length > 0);
      });

    onPressObsevable
      .pipe(
        RxOperations.throttleTime(2000),
        RxOperations.withLatestFrom(
          combineLatest(userNameObservable, passwordObservable),
        ),
        RxOperations.flatMap(([onPress, userName, passsword]) => {
          return loginObservable(userName, passsword);
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
        textObservable={textObservable => {
          userNameObservable = textObservable;
        }}
      />
      <RxTextInput
        textObservable={textObservable => {
          passwordObservable = textObservable;
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
        disableObservable={disableObservable}
        onPressObsevable={obsevable => {
          onPressObsevable = obsevable;
        }}
      />
    </>
  );
};

export default LoginForm;
