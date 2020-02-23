// @flow

import {Button, FlatList, Text, View} from 'react-native';
import {ReplaySubject} from 'rxjs';
import React, {useState, useEffect} from 'react';
import * as RxOperations from 'rxjs/operators';

import {searchTextObservable} from '../services/doSomethingObservable';
import SearchBar from '../components/SearchBar';

const SearchBarScreen = (props: {}) => {
  const [items, setItems] = useState([]);
  const [textSubject, setTextSubject] = useState(new ReplaySubject(20));
  const [text, setText] = useState();

  useEffect(() => {
    var observable = textSubject
      .pipe(
        RxOperations.tap(text => {
          setText(text);
        }),
      )
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
      // 2 switchMap
      .pipe(
        RxOperations.switchMap((value, index) => {
          return searchTextObservable(value);
        }),
      )
      .subscribe(data => {
        setItems(data);
      });

    return () => {
      observable.unsubscribe();
    };
  }, [textSubject]);

  return (
    <>
      <View>
        <SearchBar
          onTextChange={text => {
            textSubject.next(text);
          }}
          value={text}
        />
        <Button
          onPress={() => {
            var observable = textSubject
              .pipe(
                RxOperations.tap(text => {
                  setText(text);
                }),
              )
              // .pipe(RxOperations.take(1))
              .pipe(
                RxOperations.flatMap((value, index) => {
                  return searchTextObservable(value);
                }),
              )
              .subscribe(data => {
                setItems(data);
              });
          }}
          title="Replay"
        />
      </View>
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
