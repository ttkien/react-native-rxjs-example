import {Button} from 'react-native';
import {Observable, Subject} from 'rxjs';
import React, {useEffect, useState} from 'react';

const RxButton = ({
  disable$,
  onPress$,
  ...props
}: {
  onPress$: Observable<{}>,
  disable$: Observable<boolean>,
}) => {
  const [disabled, setDisabled] = useState(props.disabled || false);
  const [onPressSubject$, setOnPressSubject] = useState(new Subject());
  useEffect(() => {
    const behaviourSubject$ = onPressSubject$.asObservable();
    onPress$(onPressSubject$);
    disable$.subscribe(disabled => setDisabled(disabled));
    return () => {};
  });
  return (
    <Button
      onPress={() => {
        onPressSubject$.next({});
      }}
      {...props}
      disabled={disabled}
    />
  );
};

export default RxButton;
