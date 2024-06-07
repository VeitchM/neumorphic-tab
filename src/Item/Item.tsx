import { LayoutRectangle, Pressable, View } from "react-native";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";

import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import IconWrapper from "./IconWrapper";
import { TabBarIcon, TabBarLabel, TabBarProperties, TabBarProps } from "../types";
import defaultTabBarProps from "../const";

export default function Item(props: {
  isFocused: boolean;
  // screen: BottomTabDescriptor;
  Icon?: TabBarIcon;
  Label?: TabBarLabel;
  tabBarProperties: TabBarProperties;
  onPress?: () => void;
}) {
  const { isFocused, onPress, Icon, Label } = props;


  const [beingPressed, setBeingPressed] = useState(false);

  const {tabBarProperties} = props

  const color = isFocused
    ? tabBarProperties.focusedColor
    : tabBarProperties.unfocusedColor;

  const isFocusedTransition = useSharedValue(0);

  useEffect(() => {
    isFocusedTransition.value = withTiming(isFocused ? 1 : 0);
    console.log("Changed focused", isFocused);
  }, [isFocused]);

  const tabEdge =
    -tabBarProperties.tabHeight / 2 +
    (tabBarProperties.invert ? -tabBarProperties.smallRadius : tabBarProperties.smallRadius);

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            isFocusedTransition.value,
            [0, 1],
            [tabBarProperties.buttonUnselectedScale, 1]
          ),
        },
        {
          translateY: interpolate(
            isFocusedTransition.value,
            [0, 1],
            [0, tabEdge]
          ),
        },
      ],
    };
  });
  const textStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      opacity: isFocusedTransition.value,
      transform: [
        { scale: interpolate(isFocusedTransition.value, [0, 1], [0, 1]) },
        {
          translateY: interpolate(
            isFocusedTransition.value,
            [0, 1],
            [
              tabBarProperties.canvasHeight,
              tabEdge +
                tabBarProperties.buttonSize / 2 +
                tabBarProperties.labelGap +
                tabBarProperties.radiusGap,
            ]
          ),
        },
      ],
    };
  });

  return (
    <Pressable
      style={[
        {
          flex: 1,
          gap: 12,
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        },
      ]}
      onPress={onPress}
      onPressIn={() => setBeingPressed(true)}
      onPressOut={() => setBeingPressed(false)}
    >
      {Icon ? (
        <Animated.View style={iconStyle}>
          <IconWrapper
            size={tabBarProperties.buttonSize}
            focused={isFocused}
            beingPressed={beingPressed}
            baseColor={tabBarProperties.itemColor}
            inverted={tabBarProperties.invert}
          >
            <Icon
              color={color}
              focused={isFocused}
              size={(tabBarProperties.buttonSize / 4) * 3}
            />
          </IconWrapper>
        </Animated.View>
      ) : null}
      <Animated.View style={textStyle}>
        {Label ? (
          <Label
            color={tabBarProperties.textColor}
            focused={isFocused}
            children={""}
          />
        ) : null}
      </Animated.View>
    </Pressable>
  );
}
