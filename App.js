import React from 'react';
import { StyleSheet } from 'react-native';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from "redux-thunk";
import { Provider } from 'react-redux'
import rootReducer from './reducers';
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

import AppContainer from './AppContainer';

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
        <AppContainer />
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
