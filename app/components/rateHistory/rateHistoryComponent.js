import React from "react";
import { Card, CardItem, Item, Right, Left, Body } from "native-base";
import { View, Text } from "react-native";
import { height, width, totalSize } from "react-native-dimension";
import PureChart from "react-native-pure-chart";
import { DefaultAppTheme } from "uRnFramework-basic-components";
const sampleData = [
  { x: "2018-01-01", y: 30 },
  { x: "2018-01-02", y: 200 },
  { x: "2018-01-03", y: 170 },
  { x: "2018-01-04", y: 250 },
  { x: "2018-01-05", y: 10 }
];
class RateHistoryComponent extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Card>
        <CardItem header>
          <Left>
            <Text
              style={{
                fontSize: totalSize(2.08),
                fontWeight: "500",
                color: DefaultAppTheme.primary + "BC",
                fontFamily: DefaultAppTheme.primaryFontFamily
              }}
            >
              Rate history
            </Text>
          </Left>
          <Right>
            <Text
              style={{
                fontSize: totalSize(2.08),
                fontWeight: "500",
                color: DefaultAppTheme.primary + "BC",
                fontFamily: DefaultAppTheme.primaryFontFamily
              }}
            >
              Rate history
            </Text>
          </Right>
        </CardItem>
        <CardItem style={{ width: width(80) }}>
          <PureChart
            numberOfYAxisGuideLine={8}
            data={sampleData}
            color={DefaultAppTheme.primary}
            type="line"
          />
        </CardItem>
      </Card>
    );
  }
}

export default RateHistoryComponent;