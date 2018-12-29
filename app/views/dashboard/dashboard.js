import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  Alert,
  Animated
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
    this.props.navigation.setParams({
      onHistory: this.openRecentHistory
    });
    this.state = {
      isLoading: false,
      cardBounceValue1: new Animated.Value(height(60)),
      cardBounceValue2: new Animated.Value(height(120)),
      cardBounceValue3: new Animated.Value(height(180))
    };
  }

  openRecentHistory = () => {
    Actions.push("historyView");
  };
  /**
   * Important as its the callback from store
   * @param {*} currentContext
   * @param {*} appContext
   */
  renderTrigger(currentContext, appContext) {}

  componentDidMount() {
    AppContext.initializeEventActivityListeners(this, this.renderTrigger);
    SplashScreen.hide();
    Animated.parallel([
      Animated.spring(this.state.cardBounceValue1, {
        toValue: 0,
        velocity: 1,
        tension: 4,
        friction: 12,
        useNativeDriver: true
      }),
      Animated.spring(this.state.cardBounceValue2, {
        toValue: 0,
        velocity: 2,
        tension: 4,
        friction: 12,
        useNativeDriver: true
      }),
      Animated.spring(this.state.cardBounceValue3, {
        toValue: 0,
        velocity: 3,
        tension: 4,
        friction: 12,
        useNativeDriver: true
      })
    ]).start();
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
          <Animated.View
            style={{ transform: [{ translateY: this.state.cardBounceValue1 }] }}
          >
            <ConversionCardComponent />
          </Animated.View>
          <Animated.View
            style={{ transform: [{ translateY: this.state.cardBounceValue2 }] }}
          >
            <RateHistoryComponent />
          </Animated.View>
          <Animated.View
            style={{ transform: [{ translateY: this.state.cardBounceValue3 }] }}
          >
            <HowToCardComponent />
          </Animated.View>
          {this.loader()}
        </Content>
      </Container>
    );
  }
}

export default Dashboard;
