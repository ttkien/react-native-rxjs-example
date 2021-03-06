// @flow

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SafeAreaView, StyleSheet, ScrollView, StatusBar} from 'react-native';
import React from 'react';

import ABTasks from './app/ABTasks';
import LoginScreen from './app/loginScreen';
import SearchBarScreen from './app/searchBarScreen';

type DemoType =
  | 'SEARCH_BAR'
  | 'SEARCH_BAR_OBSERVABLE'
  | 'ABTASK'
  | 'LOGIN_FORM';
import SearchBarObservableScreen from './app/searchBarObservableScreen';

const App: () => React$Node = () => {
  const demo: DemoType = 'ABTASK';
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {demo == 'SEARCH_BAR' && <SearchBarScreen />}
          {demo == 'SEARCH_BAR_OBSERVABLE' && <SearchBarObservableScreen />}
          {demo == 'ABTASK' && <ABTasks studentID="1990" classID="classID" />}
          {demo == 'LOGIN_FORM' && <LoginScreen />}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
