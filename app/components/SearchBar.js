// @flow

import {TextInput} from 'react-native';
import React, {useState} from 'react';

const SearchBar = (props: {value: string, onChangeText: string => void}) => {
  return (
    <>
      <TextInput
        value={props.value}
        style={{
          height: 30,
          margin: 30,
        }}
        onChangeText={text => {
          props.onTextChange(text);
        }}
      />
    </>
  );
};

export default SearchBar;
