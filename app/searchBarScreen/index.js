import {FlatList, Text} from 'react-native';
import React, {useState} from 'react';

import {searchText} from '../services/doSomeThing';
import SearchBar from '../components/SearchBar';

const SearchBarScreen = (props: {}) => {
  const [items, setItems] = useState([]);

  return (
    <>
      <SearchBar
        onTextChange={text => {
          searchText(text, data => {
            setItems(data);
          });
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
