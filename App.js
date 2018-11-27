import React from 'react';
import { StyleSheet } from 'react-native';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from "redux-thunk";
import { Provider } from 'react-redux'
import rootReducer from './reducers';

import { RootNav } from './navigation';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunk
    )
  )
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootNav />
      </Provider>
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
