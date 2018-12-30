import React from "react";
import { View, Text, Animated } from "react-native";
import {
  Card,
  CardItem,
  Left,
  Right,
  Body,
  Icon,
  Item,
  Input,
  Picker,
  Spinner,
  Toast
} from "native-base";
import ConversionServiceManager from "./serviceManger/conversionServiceManager";
import { DefaultAppTheme, Touchable } from "uRnFramework-basic-components";
import { width, totalSize, height } from "react-native-dimension";
import fx from "money";
import { AppContext } from "uRnFramework-app-core";
import LoadFailComponent from "../loader/loadFail/loadFailComponent";
import IsLoadingComponent from "../loader/isLoading/isLoadingComponent";
import Util from "../../util/util";
class ConversionCardComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      loadfailed: false,
      rates: [],
      base: "",
      currencySelection: [],
      fromCurrency: "",
      fromCurrencyValue: "1",
      toCurrency: "",
      toCurrencyValue: "1",
      cardContentBounceValue1: new Animated.Value(-width(20)),
      cardContentBounceValue2: new Animated.Value(-width(50))
    };
  }

  onToCurrencyChange(value: string) {
    if (this.state.toCurrencyValue) {
      let tmp = fx(this.state.toCurrencyValue)
        .from(value)
        .to(this.state.fromCurrency)
        .toFixed(2);

      this.setState({
        toCurrency: value,
        fromCurrencyValue: tmp
      });
      let newAppContext = AppContext.getAppContext();
      newAppContext.toCurrency = value;
      AppContext.setAppContext(newAppContext);
    } else {
      Toast.show({
        text: "Need a value to convert!",
        duration: 1500
      });
    }
  }

  onFromCurrencyChange(value: string) {
    if (this.state.fromCurrencyValue) {
      let tmp = fx(this.state.fromCurrencyValue)
        .from(value)
        .to(this.state.toCurrency)
        .toFixed(2);

      this.setState({
        fromCurrency: value,
        toCurrencyValue: tmp
      });

      let newAppContext = AppContext.getAppContext();
      newAppContext.fromCurrency = value;
      AppContext.setAppContext(newAppContext);
    } else {
      Toast.show({
        text: "Need a value to convert!",
        duration: 1500
      });
    }
  }

  componentDidMount() {
    ConversionServiceManager.getRates().then(
      res => {
        this.prepareCurrencySelectionData(res);
      },
      err => {
        this.setState({
          isLoaded: false,
          loadfailed: true
        });
      }
    );
  }

  prepareCurrencySelectionData(res) {
    let currencySelectionDataArray = [];
    let currencyRatesForMoneyJs = [];
    res.rates.map(item => {
      currencySelectionDataArray.push(item.currency);
      currencyRatesForMoneyJs[item.currency] = item.rate;
    });
    fx.base = res.base;
    fx.rates = currencyRatesForMoneyJs;
    this.setState({
      isLoaded: true,
      base: res.base,
      rates: res.rates,
      currencySelection: currencySelectionDataArray,
      fromCurrency: currencySelectionDataArray[0],
      toCurrency: currencySelectionDataArray[0]
    });
    let newAppContext = AppContext.getAppContext();
    newAppContext.fromCurrency = currencySelectionDataArray[0];
    newAppContext.toCurrency = currencySelectionDataArray[0];
    AppContext.setAppContext(newAppContext);
    this._animateComponents();
  }

  _animateComponents = () => {
    Animated.parallel([
      Animated.spring(this.state.cardContentBounceValue1, {
        toValue: 0,
        velocity: 3,
        tension: 2,
        friction: 8,
        useNativeDriver: true
      }),
      Animated.spring(this.state.cardContentBounceValue2, {
        toValue: 0,
        velocity: 3,
        tension: 2,
        friction: 8,
        useNativeDriver: true
      })
    ]).start();
  };

  fromCurrencyValueChange(text) {
    if (text) {
      let tmp = fx(text)
        .from(this.state.fromCurrency)
        .to(this.state.toCurrency)
        .toFixed(2);

      this.setState({
        fromCurrencyValue: text,
        toCurrencyValue: tmp
      });
    } else {
      Toast.show({
        text: "Need a value here!",
        duration: 1500
      });

      this.setState({
        fromCurrencyValue: text
      });
    }
  }

  toCurrencyValueChange(text) {
    if (text) {
      let tmp = fx(text)
        .from(this.state.toCurrency)
        .to(this.state.fromCurrency)
        .toFixed(2);

      this.setState({
        fromCurrencyValue: tmp,
        toCurrencyValue: text
      });
    } else {
      Toast.show({
        text: "Need a value here!",
        duration: 1500
      });

      this.setState({
        toCurrencyValue: text
      });
    }
  }

  _renderConversionCard() {
    return (
      <View>
        <Animated.View
          style={{
            transform: [{ translateY: this.state.cardContentBounceValue1 }]
          }}
        >
          {this._renderFromCurrency()}
        </Animated.View>
        <Animated.View
          style={{
            transform: [{ translateY: this.state.cardContentBounceValue2 }]
          }}
        >
          {this._renderToCurrency()}
          {this._renderSaveButton()}
        </Animated.View>
      </View>
    );
  }

  _renderFromCurrency = () => {
    return (
      <CardItem>
        <Left>
          <Item rounded>
            <Input
              placeholder="value"
              keyboardType="numeric"
              value={`${this.state.fromCurrencyValue}`}
              onChangeText={text => {
                this.fromCurrencyValueChange(text);
              }}
            />
          </Item>
        </Left>
        <Right>
          <Item>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.fromCurrency}
              onValueChange={this.onFromCurrencyChange.bind(this)}
            >
              {this.state.currencySelection.map(item => {
                return <Picker.Item label={item} value={item} key={item} />;
              })}
            </Picker>
          </Item>
        </Right>
      </CardItem>
    );
  };

  _renderToCurrency = () => {
    return (
      <CardItem>
        <Left>
          <Item rounded>
            <Input
              placeholder="value"
              keyboardType="numeric"
              value={`${this.state.toCurrencyValue}`}
              onChangeText={text => {
                this.toCurrencyValueChange(text);
              }}
            />
          </Item>
        </Left>
        <Right>
          <Item>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.toCurrency}
              onValueChange={this.onToCurrencyChange.bind(this)}
            >
              {this.state.currencySelection.map(item => {
                return <Picker.Item label={item} value={item} key={item} />;
              })}
            </Picker>
          </Item>
        </Right>
      </CardItem>
    );
  };

  _renderSaveButton = () => {
    return (
      <CardItem>
        <Body
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Touchable
            onPress={() => {
              Util.prepareHistory(
                this.state.fromCurrency,
                this.state.toCurrency,
                this.state.fromCurrencyValue,
                this.state.toCurrencyValue
              );
            }}
            content={
              <View
                style={{
                  width: width(70),
                  height: height(5),
                  borderRadius: totalSize(10),
                  backgroundColor: DefaultAppTheme.secondary,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row"
                }}
              >
                <Icon
                  type="MaterialCommunityIcons"
                  name="content-save"
                  style={{
                    color: DefaultAppTheme.whiteColor,
                    fontSize: totalSize(3)
                  }}
                />
                <Text
                  style={{
                    fontFamily: DefaultAppTheme.primaryFontFamily,
                    color: DefaultAppTheme.whiteColor,
                    fontSize: totalSize(2.08),
                    fontWeight: "500",
                    marginLeft: width(2.5)
                  }}
                >
                  Save Conversion
                </Text>
              </View>
            }
          />
        </Body>
      </CardItem>
    );
  };
  _renderIsLoading() {
    let renderContent = this.state.loadfailed ? (
      <LoadFailComponent message={"Load failure"} />
    ) : (
      <IsLoadingComponent message={"Loading exchange rates"} />
    );

    return renderContent;
  }

  render() {
    return (
      <Card>
        {this.state.isLoaded
          ? this._renderConversionCard()
          : this._renderIsLoading()}
      </Card>
    );
  }
}

export default ConversionCardComponent;
