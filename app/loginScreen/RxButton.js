import {Button} from 'react-native';
import {Observable, Subject} from 'rxjs';
import React, {useEffect, useState} from 'react';

const RxButton = ({
  disableObservable,
  onPressObsevable,
  ...props
}: {
  onPressObsevable: Observable<{}>,
  disableObservable: Observable<boolean>,
}) => {
  const [disabled, setDisabled] = useState(props.disabled || false);
  const [onPressSubject, setOnPressSubject] = useState(new Subject());
  useEffect(() => {
    const behaviourSubjectObservable = onPressSubject.asObservable();
    onPressObsevable(onPressSubject);
    disableObservable.subscribe(disabled => setDisabled(disabled));
    return () => {};
  });
  return (
    <Button
      onPress={() => {
        behaviourSubject.next({});
      }}
      {...props}
      disabled={disabled}
    />
  );
};

export default RxButton;
