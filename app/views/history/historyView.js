import React from "react";
import { View, Text, Animated, Easing } from "react-native";
import {
  Container,
  Content,
  Accordion,
  CardItem,
  Icon,
  Card,
  Thumbnail,
  Body,
  Left,
  Right
} from "native-base";
import { AppContext } from "uRnFramework-app-core";
import { DefaultAppTheme } from "uRnFramework-basic-components";
import { width, height, totalSize } from "react-native-dimension";
class HistoryView extends React.PureComponent {
  constructor(props) {
    super(props);
    let appContext = AppContext.getAppContext();
    this.historyData = appContext.history;
    this.historyKeys = [];
    if (this.historyData) {
      this.historyKeys = Object.keys(this.historyData);
    }
  }

  _renderHeader(title, expanded) {
    return (
      <Card
        style={{
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Text style={{ fontWeight: "500" }}>{title}</Text>
        {expanded ? (
          <Icon
            style={{ fontSize: totalSize(3) }}
            type="AntDesign"
            name="minus"
          />
        ) : (
          <Icon
            style={{ fontSize: totalSize(3) }}
            type="AntDesign"
            name="plus"
          />
        )}
      </Card>
    );
  }

  /**
   * cant use this or state here in this stupid function :/
   * @param {*} content
   */
  _renderContent(content) {
    let historyData = AppContext.getAppContext().history;
    let itemList = historyData[content];
    let currencyArray = content.split("_");
    let tep = new Animated.Value(0);
    Animated.timing(tep, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
    return itemList.map(item => (
      <Animated.View
        style={{
          transform: [{ translateY: tep }]
        }}
        key={item.convertedValue}
      >
        <Card transparent>
          <CardItem cardBody>
            <Left>
              <Body>
                <Text
                  style={{
                    fontSize: totalSize(1.8),
                    color: DefaultAppTheme.blackColor + "BC",
                    fontFamily: DefaultAppTheme.primaryFontFamily,
                    fontWeight: "300"
                  }}
                >
                  To Convert : {item.toConvert} {currencyArray[0]}
                </Text>
              </Body>
            </Left>
            <Right>
              <Body>
                <Text
                  style={{
                    fontSize: totalSize(1.8),
                    color: DefaultAppTheme.blackColor + "BC",
                    fontFamily: DefaultAppTheme.primaryFontFamily,
                    fontWeight: "300"
                  }}
                >
                  Result : {item.convertedValue} {currencyArray[1]}
                </Text>
              </Body>
            </Right>
          </CardItem>
        </Card>
      </Animated.View>
    ));
  }

  _renderAccordion = () => {
    if (this.historyKeys.length > 0) {
      return (
        <Accordion
          dataArray={this.historyKeys}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
        />
      );
    } else {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: height(35)
          }}
        >
          <Text
            style={{
              fontSize: totalSize(2),
              color: DefaultAppTheme.blackColor + "80",
              fontFamily: DefaultAppTheme.primaryFontFamily,
              fontWeight: "400",
              textAlign: "center"
            }}
          >
            No data recorded.
          </Text>
          <Text
            style={{
              fontSize: totalSize(2),
              color: DefaultAppTheme.blackColor + "80",
              fontFamily: DefaultAppTheme.primaryFontFamily,
              fontWeight: "400",
              textAlign: "center"
            }}
          >
            This page shows the active history of the user.
          </Text>
        </View>
      );
    }
  };
  render() {
    return (
      <Container>
        <Content>{this._renderAccordion()}</Content>
      </Container>
    );
  }
}

export default HistoryView;
