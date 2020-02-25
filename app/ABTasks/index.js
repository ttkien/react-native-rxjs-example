// @flow
import {Text} from 'react-native';
import {zip} from 'rxjs';
import React, {useState, useEffect} from 'react';

import type ClassType from './ClassType';
import type StudentType from './StudentType';
import getClassById$ from './getClassById$';
import getStudentById$ from './getStudentById$';

const ABTasks = ({
  studentID = 'default',
  classID = 'default',
}: {
  studentID: string,
  classID: string,
}) => {
  const [startLoadingTime, setStartLoadingTime] = useState(new Date());
  const [finishingTime, setFinishingTime] = useState<?Date>(null);
  const [student, setStudent] = useState<?StudentType>(null);
  const [classA, setClass] = useState<?ClassType>(null);

  useEffect(() => {
    const disposable = zip(
      getStudentById$(studentID),
      getClassById$(classID),
    ).subscribe(value => {
      setStudent(value[0]);
      setClass(value[1]);
      setFinishingTime(new Date());
    });
    return () => {
      disposable.unsubscribe();
    };
  });

  if (!finishingTime) {
    return <Text> isLoading </Text>;
  }

  const time = finishingTime.getTime() - startLoadingTime.getTime();
  return (
    <>
      <Text>finish 2 task in {time} miliseconds </Text>
      <Text> {'Student ' + student.name} </Text>
      <Text> {'Class ' + classA.name} </Text>
    </>
  );
};

export default ABTasks;
