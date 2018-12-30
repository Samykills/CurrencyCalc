import React from "react";
import {
  Card,
  CardItem,
  Item,
  Right,
  Left,
  Body,
  Spinner,
  Toast
} from "native-base";
import { View, Text, Animated } from "react-native";
import { height, width, totalSize } from "react-native-dimension";
import PureChart from "react-native-pure-chart";
import { DefaultAppTheme, Touchable } from "uRnFramework-basic-components";
import RateHistoryServiceManager from "./serviceManager/rateHistoryServiceManager";
import { AppContext } from "uRnFramework-app-core";
import LoadFailComponent from "../loader/loadFail/loadFailComponent";
import IsLoadingComponent from "../loader/isLoading/isLoadingComponent";
class RateHistoryComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      graphData: [],
      isLoaded: false,
      loadFailed: false,
      fromCurrency: "",
      toCurrency: "",
      graphName: "",
      cardContentBounceValue1: new Animated.Value(-height(10))
    };
  }

  storeTrigger(currentContext, appContext) {
    if (
      appContext.fromCurrency !== currentContext.state.fromCurrency ||
      appContext.toCurrency !== currentContext.state.toCurrency
    ) {
      currentContext.loadHistoryGraph(
        currentContext,
        appContext.fromCurrency,
        appContext.toCurrency
      );
    }
  }

  loadHistoryGraph(context, fromCurrency, toCurrency) {
    context.setState({ isLoaded: false, loadFailed: false });
    RateHistoryServiceManager.getRateHistory(fromCurrency, toCurrency).then(
      res => {
        let gName = toCurrency + " vs " + fromCurrency;
        context.setState({ graphData: res, isLoaded: true, graphName: gName });
        Animated.spring(context.state.cardContentBounceValue1, {
          toValue: 0,
          velocity: 3,
          tension: 2,
          friction: 8,
          useNativeDriver: true
        }).start();
      },
      err => {
        context.setState({ isLoaded: false, loadFailed: true });
      }
    );
  }

  componentDidMount() {
    AppContext.initializeEventActivityListeners(this, this.storeTrigger);
    // this.loadHistoryGraph(this, this.state.fromCurrency, this.state.toCurrency);
    this._stopLoad();
  }

  _renderGraphData() {
    return (
      <View>
        <Animated.View
          style={{
            transform: [{ translateY: this.state.cardContentBounceValue1 }]
          }}
        >
          <CardItem header>
            <Left>
              <View
                style={{
                  borderRadius: 20,
                  borderWidth: 1,

                  borderColor: DefaultAppTheme.secondary + "50"
                }}
              >
                <Touchable
                  onPress={() => {
                    Toast.show({
                      text: "Only last 8 days data available via Api :("
                    });
                  }}
                  content={
                    <Text
                      style={{
                        fontSize: totalSize(1.56),
                        fontWeight: "500",
                        padding: 8,
                        color: DefaultAppTheme.primary + "BC",
                        fontFamily: DefaultAppTheme.primaryFontFamily
                      }}
                    >
                      8 Days
                    </Text>
                  }
                />
              </View>
            </Left>
            <Right>
              <View
                style={{
                  borderRadius: 20,
                  borderWidth: 1,
                  padding: 8,
                  borderColor: DefaultAppTheme.secondary + "50"
                }}
              >
                <Text
                  style={{
                    fontSize: totalSize(1.56),
                    fontWeight: "500",
                    color: DefaultAppTheme.primary + "BC",
                    fontFamily: DefaultAppTheme.primaryFontFamily
                  }}
                >
                  {this.state.graphName}
                </Text>
              </View>
            </Right>
          </CardItem>

          <CardItem style={{ width: width(80) }}>
            <PureChart
              numberOfYAxisGuideLine={5}
              data={this.state.graphData}
              color={DefaultAppTheme.primary}
              type="line"
            />
          </CardItem>
        </Animated.View>
      </View>
    );
  }

  _renderIsLoading() {
    let renderContent = this.state.loadFailed ? (
      <LoadFailComponent message={"Load failure"} />
    ) : (
      <IsLoadingComponent message={"Loading Historical data"} />
    );

    return renderContent;
  }

  _stopLoad = () => {
    setTimeout(() => {
      if (!this.state.toCurrency && !this.state.fromCurrency)
        this.setState({
          isLoaded: false,
          loadFailed: true
        });
    }, 15000);
  };

  render() {
    return (
      <Card>
        {this.state.isLoaded
          ? this._renderGraphData()
          : this._renderIsLoading()}
      </Card>
    );
  }
}

export default RateHistoryComponent;
