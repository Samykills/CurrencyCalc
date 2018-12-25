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
  Spinner
} from "native-base";
import ConversionServiceManager from "./serviceManger/conversionServiceManager";
import { DefaultAppTheme } from "uRnFramework-basic-components";
import { width, totalSize, height } from "react-native-dimension";
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
    this.setState({
      toCurrency: value
    });
  }

  onFromCurrencyChange(value: string) {
    this.setState({ fromCurrency: value });
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
    let currencySelectionDataArray = res.rates.map(item => {
      return item.currency;
    });
    this.setState({
      isLoaded: true,
      base: res.base,
      rates: res.rates,
      currencySelection: currencySelectionDataArray,
      fromCurrency: currencySelectionDataArray[0],
      toCurrency: currencySelectionDataArray[1]
    });
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
  }

  _renderConversionCard() {
    return (
      <View>
        <Animated.View
          style={{
            transform: [{ translateY: this.state.cardContentBounceValue1 }]
          }}
        >
          <CardItem>
            <Left>
              <Item rounded>
                <Input
                  placeholder="value"
                  keyboardType="numeric"
                  value={`${this.state.fromCurrencyValue}`}
                  onChangeText={text => {
                    this.setState({
                      fromCurrencyValue: text,
                      toCurrencyValue: 16
                    });
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
        </Animated.View>
        <Animated.View
          style={{
            transform: [{ translateY: this.state.cardContentBounceValue2 }]
          }}
        >
          <CardItem>
            <Left>
              <Item rounded>
                <Input
                  placeholder="value"
                  keyboardType="numeric"
                  value={`${this.state.toCurrencyValue}`}
                  onChangeText={text => {
                    this.setState({ toCurrencyValue: text });
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
        </Animated.View>
      </View>
    );
  }

  _renderIsLoading() {
    let renderContent = this.state.loadfailed ? (
      <CardItem>
        <Icon
          ios="ios-warning"
          android="md-warning"
          style={{
            color: "#f7b731"
          }}
        />
        <Text
          style={{
            fontSize: totalSize(2.08),
            fontWeight: "500",
            fontFamily: DefaultAppTheme.primaryFontFamily,
            color: "#f7b731",
            marginLeft: width(2)
          }}
        >
          Load failed
        </Text>
      </CardItem>
    ) : (
      <CardItem>
        <Spinner color={DefaultAppTheme.primary} />
        <Text
          style={{
            fontSize: totalSize(2.08),
            fontWeight: "500",
            fontFamily: DefaultAppTheme.primaryFontFamily,
            color: DefaultAppTheme.primary,
            marginLeft: width(2)
          }}
        >
          Getting exchange rates
        </Text>
      </CardItem>
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
