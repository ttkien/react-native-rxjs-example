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
  const behaviourSubject = new Subject();
  const [disabled, setDisabled] = useState(props.disabled || false);
  useEffect(() => {
    disableObservable.subscribe(disabled => setDisabled(disabled));
    onPressObsevable(behaviourSubject.asObservable());
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
