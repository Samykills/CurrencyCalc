import React, { Component } from "react";
import { Platform, StyleSheet, View, StatusBar, Text } from "react-native";
import {
  setJSExceptionHandler,
  setNativeExceptionHandler
} from "react-native-exception-handler";
import JsErrorHandler from "./app/exceptionHandler/jsExceptionHandler";
import NativeErrorHandler from "./app/exceptionHandler/nativeExceptionHandler";
import { DefaultAppTheme } from "uRnFramework-basic-components";
import { Root } from "native-base";
import AppRouter from "./app/app-router";
import { AppContext, AppContextModel } from "uRnFramework-app-core";
import Util from "./app/util/util";
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statusBar: {
    height: STATUSBAR_HEIGHT
  }
});

const SSCStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

setJSExceptionHandler(JsErrorHandler, false);

setNativeExceptionHandler(NativeErrorHandler, true);

(setStore => {
  AppContext.setAppContext(AppContextModel);
  Util.initalizeHistory();
})();

export default class App extends Component<Props> {
  render() {
    return (
      <Root>
        <View style={styles.container}>
          <SSCStatusBar
            backgroundColor={DefaultAppTheme.primaryDark}
            barStyle="light-content"
          />
          {/* <Text>hahahah</Text> */}
          <AppRouter />
        </View>
      </Root>
    );
  }
}
