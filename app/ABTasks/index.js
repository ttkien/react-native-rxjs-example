// @flow
import {Text} from 'react-native';
import {zip} from 'rxjs';
import React, {useState, useEffect} from 'react';

import {getClassByIdObservable} from './getClassByIdObservable';
import {getStudentByIdObservable} from './getStudentByIdObservable';
import type ClassType from './ClassType';
import type StudentType from './StudentType';

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
    zip(
      getStudentByIdObservable(studentID),
      getClassByIdObservable(classID),
    ).subscribe(value => {
      setStudent(value[0]);
      setClass(value[1]);
      setFinishingTime(new Date());
    });
    return () => {};
  });

  if (!finishingTime) {
    return <Text> isLoading </Text>;
  }

  const time = finishingTime.getTime() - startLoadingTime.getTime();
  return (
    <>
      <Text> {time} </Text>
      <Text> {'Student ' + student.name} </Text>
      <Text> {'Class ' + classA.name} </Text>
    </>
  );
};

export default ABTasks;
