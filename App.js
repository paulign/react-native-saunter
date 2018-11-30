import React from "react";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./src/reducers";
import { YellowBox } from "react-native";
import _ from "lodash";
import AppContainer from "./src/AppContainer";

YellowBox.ignoreWarnings(["Setting a timer"]);

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
