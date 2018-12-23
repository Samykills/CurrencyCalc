import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import {
  setJSExceptionHandler,
  setNativeExceptionHandler
} from "react-native-exception-handler";
import JsErrorHandler from "./app/exceptionHandler/jsExceptionHandler";
import NativeErrorHandler from "./app/exceptionHandler/nativeExceptionHandler";

setJSExceptionHandler(JsErrorHandler, false);

setNativeExceptionHandler(NativeErrorHandler, true);
export default class App extends Component<Props> {
  render() {
    return (
      <View>
        <Text>Welcome to React Native!</Text>
      </View>
    );
  }
}
