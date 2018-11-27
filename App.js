import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootNav } from './navigation';

export default class App extends React.Component {
  render() {
    return (
      <RootNav />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
