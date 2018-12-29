import React from "react";
import { Text } from "react-native";
import { CardItem, Spinner } from "native-base";
import { totalSize, width } from "react-native-dimension";
import { DefaultAppTheme } from "uRnFramework-basic-components";

class IsLoadingComponent extends React.PureComponent {
  render() {
    return (
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
          {this.props.message}
        </Text>
      </CardItem>
    );
  }
}

export default IsLoadingComponent;
