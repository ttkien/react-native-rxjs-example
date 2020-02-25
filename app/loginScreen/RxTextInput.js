// @flow

import {Observable, BehaviorSubject} from 'rxjs';
import {TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';

const RxTextInput = ({
  value,
  text$,
  ...props
}: {
  value: string,
  text$: (Observable<string>) => void,
}) => {
  const behaviourSubject = new BehaviorSubject('');
  useEffect(() => {
    text$(behaviourSubject.asObservable());
    return () => {};
  });
  return (
    <TextInput
      onChangeText={text => {
        behaviourSubject.next(text);
      }}
      value={value}
      style={{
        fontSize: 20,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
      }}
      {...props}
    />
  );
};

export default RxTextInput;
