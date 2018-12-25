import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  Alert
} from "react-native";
import {
  Touchable,
  SSCAnimations,
  AppConst,
  Loader,
  DefaultAppTheme,
  PermissionAccess,
  PermissionConstant
} from "uRnFramework-basic-components";
import { Actions } from "react-native-router-flux";
import { AppContext } from "uRnFramework-app-core";

import { width, height, totalSize } from "react-native-dimension";
import SplashScreen from "react-native-splash-screen";
import {
  Left,
  Right,
  Body,
  Thumbnail,
  Card,
  CardItem,
  Button,
  Icon,
  Content,
  Container
} from "native-base";
import ConversionCardComponent from "../../components/conversionCard/conversionCardComponent";
import RateHistoryComponent from "../../components/rateHistory/rateHistoryComponent";
import HowToCardComponent from "../../components/howToCard/howToCardComponent";
class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    let context = AppContext.getAppContext();
    // this.props.navigation.setParams({
    //   onNotify: this.handleNotification,
    //   onSearch: this.openLocationModal
    // });
    this.state = {
      isLoading: false
    };
  }

  /**
   * Important as its the callback from store
   * @param {*} currentContext
   * @param {*} appContext
   */
  renderTrigger(currentContext, appContext) {}

  componentDidMount() {
    AppContext.initializeEventActivityListeners(this, this.renderTrigger);
    SplashScreen.hide();
  }

  loader = () => {
    return this.state.isLoading ? (
      <Loader animating={this.state.isLoading} size="large" />
    ) : (
      <View />
    );
  };

  render() {
    return (
      <Container>
        <Content padder>
          <ConversionCardComponent />
          <RateHistoryComponent />
          <HowToCardComponent />
          {this.loader()}
        </Content>
      </Container>
    );
  }
}

export default Dashboard;
