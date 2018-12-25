import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React from "react";
import { Actions } from "react-native-router-flux";
import { DefaultAppTheme } from "uRnFramework-basic-components";
import { width, height, totalSize } from "react-native-dimension";
import { AppContext } from "uRnFramework-app-core";
import Config from "react-native-config";
import { Icon } from "native-base";

export default class DashboardNavBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderLeft = this._renderLeft.bind(this);
    this.renderRight = this._renderRight.bind(this);
  }

  _renderLeft() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center"
        }}
      >
        <TouchableOpacity
          onPress={Actions.drawerOpen}
          style={[styles.navBarCustomStyle]}
        >
          <Icon
            ios="ios-menu"
            android="md-menu"
            style={{
              color: iconColor
            }}
          />
        </TouchableOpacity>

        <Text
          style={{
            marginLeft: width(1.38),
            color: iconColor,
            fontSize: totalSize(2.03),
            textAlign: "left",
            // maxWidth: width(30),
            fontFamily: DefaultAppTheme.primaryFontFamily
          }}
        >
          {Config.APP_NAME}
        </Text>
      </View>
    );
  }

  _renderMiddle() {
    return (
      <View style={styles.logoViewStyle}>
        <Text style={styles.textTitleStyle}>{Config.APP_NAME}</Text>
      </View>
    );
  }

  _renderRight() {
    return (
      <View>
        <View
          style={[
            {
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              marginRight: width(2.77)
            }
          ]}
        >
          <TouchableOpacity onPress={this.props.onSearch}>
            <Icon
              ios="ios-pin"
              android="md-pin"
              style={{
                marginRight: width(3),
                color: iconColor
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={this.props.onNotify}>
            <Icon
              ios="ios-bookmarks"
              android="md-bookmarks"
              style={{
                marginRight: width(3),
                color: iconColor
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View
        style={[styles.container, { backgroundColor: DefaultAppTheme.primary }]}
      >
        {this.renderLeft()}
        {/* {this._renderMiddle()} */}
        {this.renderRight()}
      </View>
    );
  }
}

const iconColor = DefaultAppTheme.whiteColor;
const styles = StyleSheet.create({
  container: {
    height: height(8.56),
    flexDirection: "row",
    elevation: 5,
    shadowOpacity: 0.45,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowColor: "#000000",
    shadowRadius: 5
  },

  navBarCustomStyle: {
    justifyContent: "center",
    paddingLeft: width(5.08)
  },
  logoImageViewStyle: {
    width: width(11.16),
    height: Platform.OS === "ios" ? height(6.85) : height(6.85),
    marginLeft: width(2.77)
  },
  logoViewStyle: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center"
  },

  textTitleStyle: {
    color: iconColor,
    fontWeight: "600",
    fontSize: totalSize(1.85),
    fontFamily: "Roboto"
  }
});
