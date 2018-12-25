import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
  FlatList,
  Image
} from "react-native";
import { Actions } from "react-native-router-flux";
import { height, width, totalSize } from "react-native-dimension";
import { DefaultAppTheme, Touchable } from "uRnFramework-basic-components";
import DrawerData from "./drawerData";
import LinearGradient from "react-native-linear-gradient";
import Config from "react-native-config";
import { Icon } from "native-base";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class DrawerContent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      drawerData: DrawerData
    };
  }

  static propTypes = {
    name: PropTypes.string,
    sceneStyle: ViewPropTypes.style,
    title: PropTypes.string
  };

  static contextTypes = {
    drawer: PropTypes.object
  };

  openLoginScreen = () => {
    if (!this.state.loginComponentUserEmailId) {
      Actions.login();
    }
  };

  _renderDrawerHeader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: height(3.11)
        }}
      >
        <Text
          style={{
            color: "#FFFFFF",
            fontWeight: "bold",
            fontSize: 18
          }}
        >
          {Config.ENTERPRISE_NAME}
        </Text>
      </View>
    );
  };

  _renderDrawerBody = () => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.moduleName.toString()}
        data={this.state.drawerData}
        renderItem={({ item }) => this._renderDrawerBodyContent(item)}
        extraData={this.state.userName}
      />
    );
  };

  openIfLoggedIn(item) {
    Actions.push(item.moduleKey);
  }

  _renderDrawerBodyContent = item => {
    let androidIcon = "md-" + item.moduleIcon;
    let iosIcon = "ios-" + item.moduleIcon;
    return (
      <Touchable
        onPress={() => {
          this.openIfLoggedIn(item);
        }}
        content={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: height(3.11)
            }}
          >
            <Icon
              ios={iosIcon}
              android={androidIcon}
              style={{
                width: width(5.7),
                color: DefaultAppTheme.primaryDark
              }}
            />
            <Text
              style={{
                marginLeft: width(9.5),
                fontSize: 13,
                color: DefaultAppTheme.drawerTextColor
              }}
            >
              {item.moduleName}
            </Text>
          </View>
        }
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[DefaultAppTheme.primary, DefaultAppTheme.primaryDark]}
          style={{
            height: height(31.5)
          }}
        >
          {this._renderDrawerHeader()}
        </LinearGradient>

        <View refs="drawerBody" style={{ flex: 1 }}>
          {this._renderDrawerBody()}
          <Text
            style={{
              textAlign: "right",
              fontSize: totalSize(1),
              fontFamily: "Roboto",
              fontWeight: "500"
            }}
          >
            Version : {Config.CODE_PUSH_VERSION}
          </Text>
        </View>
      </View>
    );
  }
}

export default DrawerContent;
