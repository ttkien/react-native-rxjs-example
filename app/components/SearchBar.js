// @flow

import {TextInput} from 'react-native';
import React, {useState} from 'react';

const SearchBar = (props: {onChangeText: string => void}) => {
  const [text, setText] = useState('');
  return (
    <>
      <TextInput
        value={text}
        style={{
          height: 30,
          margin: 30,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        onChangeText={text => {
          props.onTextChange(text);
          setText(text);
        }}
      />
    </>
  );
};

export default SearchBar;
