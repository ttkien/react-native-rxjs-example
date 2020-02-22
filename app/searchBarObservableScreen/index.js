// @flow

import {FlatList, Text} from 'react-native';
import {Subject, asyncScheduler} from 'rxjs';
import * as RxOperations from 'rxjs/operators';
import React, {useState} from 'react';

import {searchTextObservable} from '../services/doSomethingObservable';
import SearchBar from '../components/SearchBar';

const SearchBarScreen = (props: {}) => {
  const [items, setItems] = useState([]);

  var textSubject = new Subject();
  textSubject
    //3 throttleTime
    // .pipe(
    //   RxOperations.throttleTime(500, asyncScheduler, {
    //     leading: true,
    //     trailing: true,
    //   }),
    // )
    // //1 with flatMap
    // .pipe(
    //   RxOperations.flatMap((value, index) => {
    //     return searchTextObservable(value);
    //   }),
    // )
    // // 2 switchMap
    // .pipe(
    //   RxOperations.switchMap((value, index) => {
    //     return searchTextObservable(value);
    //   }),
    // )
    .subscribe(data => {
      setItems(data);
    });

  return (
    <>
      <SearchBar
        onTextChange={text => {
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
