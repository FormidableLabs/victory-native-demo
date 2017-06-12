import React, { Component } from "react";
import { PanResponder, View, Text, Button } from "react-native";
import { Svg, Rect, Text as SvgText } from "react-native-svg";

class PanResponderWrapper extends Component {
  constructor(props) {
    super(props);
    this.panResponder = this.getResponder();
  }
  getResponder() {
    const yes = () => true;
    const no = () => false;
    const noop = () => null;
    return PanResponder.create({
      onStartShouldSetPanResponder: yes,
      onStartShouldSetPanResponderCapture: no,
      onMoveShouldSetPanResponder: yes,
      onMoveShouldSetPanResponderCapture: yes,
      onShouldBlockNativeResponder: yes,
      onPanResponderTerminationRequest: yes,
      onPanResponderGrant: noop,
      onPanResponderMove: noop,
      onPanResponderRelease: noop,
      onPanResponderTerminate: noop,
    });
  }
  render() {
    return (
      <View {...this.panResponder.panHandlers}>
        {this.props.children}
      </View>
    );
  }
}

const Box = ({ onPressIn, label }) => (
  <Svg width={400} height={100} viewBox="0 0 400 100" style={{ width: "100%", paddingTop: 10 }}>
    <Rect onPressIn={onPressIn} fill="lightblue" x="10" y="10" width="350" height="90" />
    <SvgText x="30" y="50">{label}</SvgText>
  </Svg>
);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  countUp() {
    this.setState({ count: this.state.count + 1 });
  }
  render() {
    return (
      <View style={{ paddingTop: 30 }}>
        <Box label="Rect" onPressIn={() => this.countUp()} />

        <PanResponderWrapper>
          <Button
            onPress={() => this.countUp()}
            title="panResponder > Button"
          />
        </PanResponderWrapper>

        <PanResponderWrapper>
          <Box label="panResponder > Rect" onPressIn={() => this.countUp()} />
        </PanResponderWrapper>

        <Text style={{fontSize: 20, textAlign: "center", padding: 30}}>{this.state.count}</Text>
      </View>
    );
  }
}
