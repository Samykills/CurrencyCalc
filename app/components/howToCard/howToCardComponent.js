import React from "react";
import { Text } from "react-native";
import { Card, CardItem } from "native-base";
class HowToCardComponent extends React.PureComponent {
  render() {
    return (
      <Card>
        <CardItem>
          <Text>About card</Text>
        </CardItem>
      </Card>
    );
  }
}

export default HowToCardComponent;
