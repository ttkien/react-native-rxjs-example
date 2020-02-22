// @flow

import {FlatList, Text} from 'react-native';
import {Subject} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import React, {useState} from 'react';

import {searchTextObservable} from '../services/doSomethingObservable';
import SearchBar from './SearchBarComponent';

const SearchBarScreen = (props: {}) => {
  const [items, setItems] = useState([]);

  var textSubject = new Subject();
  textSubject
    .pipe(
      switchMap((value, index) => {
        return searchTextObservable(value);
      }),
    )
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
        data={items}
        renderItem={({item, index, separators}) => {
          return <Text>{item} </Text>;
        }}
      />
    </>
  );
};

export default SearchBarScreen;
