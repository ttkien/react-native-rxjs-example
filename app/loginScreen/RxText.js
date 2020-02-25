// @flow
import {Observable} from 'rxjs';
import {Text} from 'react-native';
import React, {useEffect, useState} from 'react';

const RxText = ({value, ...props}: {value: Observable<string>}) => {
  const [text, setText] = useState('');
  useEffect(() => {
    const disposable = value.subscribe(t => {
      setText(t);
    });
    return () => {
      disposable.unsubscribe();
    };
  });
  return <Text {...props}> {text} </Text>;
};

export default RxText;
