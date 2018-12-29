import React from "react";
import { Text } from "react-native";
import { CardItem, Icon } from "native-base";
import { totalSize, width } from "react-native-dimension";
import { DefaultAppTheme } from "uRnFramework-basic-components";
class LoadFailComponent extends React.PureComponent {
  render() {
    return (
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
          {this.props.message}
        </Text>
      </CardItem>
    );
  }
}

export default LoadFailComponent;
