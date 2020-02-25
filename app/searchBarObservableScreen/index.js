// @flow

import {FlatList, Text} from 'react-native';
import {Subject} from 'rxjs';
import React, {useState} from 'react';
import * as RxOperations from 'rxjs/operators';

import {searchText$} from '../services/doSomething$';
import SearchBar from '../components/SearchBar';

const SearchBarScreen = (props: {}) => {
  const [items, setItems] = useState([]);

  var textSubject = new Subject();
  textSubject
    //4 retry
    // .pipe(RxOperations.retry(3))
    //3 throttleTime
    // .pipe(
    //   RxOperations.throttleTime(500, asyncScheduler, {
    //     leading: true,
    //     trailing: true,
    //   }),
    // )
    //1 with flatMap
    .pipe(
      RxOperations.flatMap((value, index) => {
        return searchText$(value);
      }),
    )
    // 2 switchMap
    // .pipe(
    // RxOperations.switchMap((value, index) => {
    // return searchText$(value);
    // }),
    // )
    .subscribe(data => {
      setItems(data);
    });

  return (
    <>
      <SearchBar
        onChangeText={text => {
          textSubject.next(text);
        }}
      />
      <FlatList
        keyExtractor={({item, index}) => item}
        data={items}
        renderItem={({item, index, separators}) => {
          return <Text>{item} </Text>;
        }}
      />
    </>
  );
};

export default SearchBarScreen;
