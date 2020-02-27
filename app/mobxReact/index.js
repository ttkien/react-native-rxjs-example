import {Text} from 'react-native';
import {observer} from 'mobx-react';
import React from 'react';
import {toStream} from 'mobx-utils';
import {from} from 'rxjs';

const Timer = observer(({timerData}) => {
  return <Text> Seconds passed: {timerData.secondPassed} </Text>;
});

export default Timer;
