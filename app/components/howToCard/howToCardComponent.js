import React from "react";
import { View, Text, Animated, Easing, StyleSheet } from "react-native";
import { Card, CardItem, Accordion, Body, Icon, Left } from "native-base";
import { DefaultAppTheme } from "uRnFramework-basic-components";
import { totalSize, width } from "react-native-dimension";
class HowToCardComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.title = ["Click here for more Info..."];
  }
  _renderHeader(title, expanded) {
    return (
      <Card
        transparent
        style={{
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <CardItem>
          <Left>
            <Icon name="md-alert" style={{ color: DefaultAppTheme.primary }} />
            <Text
              style={{
                marginLeft: width(5),
                fontWeight: "500",
                fontFamily: DefaultAppTheme.primaryFontFamily,
                color: DefaultAppTheme.primary
              }}
            >
              {title}
            </Text>
          </Left>
        </CardItem>
      </Card>
    );
  }

  /**
   * cant use this or state here in this stupid function :/
   * @param {*} content
   */
  _renderContent(content) {
    let tep = new Animated.Value(0);
    Animated.timing(tep, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
    return (
      <Animated.View
        style={{
          transform: [{ translateY: tep }]
        }}
      >
        <Card transparent>
          <CardItem>
            <Body>
              <Text style={styles.cardTextStyle}>
                This App was curated for the TaxFix challenge.
              </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={styles.cardTextStyle}>
                This is a currency Converter which uses Money.js for currency
                conversion and shows the history of last 8 days rate change as
                the api used here is from "currencyconverterapi" free tier.
              </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={styles.cardTextStyle}>
                The app Saves all the rate changes input given by the user for
                future queries. And displays them on the recent history page.
              </Text>
            </Body>
          </CardItem>
        </Card>
      </Animated.View>
    );
  }

  render() {
    return (
      <Accordion
        dataArray={this.title}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
      />
    );
  }
}

export default HowToCardComponent;

const styles = StyleSheet.create({
  cardTextStyle: {
    fontFamily: DefaultAppTheme.primaryFontFamily,
    fontWeight: "300",
    fontSize: totalSize(2),
    color: DefaultAppTheme.blackColor + "BC"
  }
});
