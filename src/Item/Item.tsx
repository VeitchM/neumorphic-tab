import { LayoutRectangle, Pressable, View } from "react-native";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";

import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import IconWrapper from "./IconWrapper";
import { TabBarIcon, TabBarLabel, TabBarProps } from "../types";
import defaultTabBarProps from "../const";

export default function Item(props: {
  isFocused: boolean;
  // screen: BottomTabDescriptor;
  Icon?: TabBarIcon;
  Label?: TabBarLabel;
  tabBarStyle?: TabBarProps;
  onPress: () => void;
  invert?: boolean;
}) {
  const { isFocused, onPress, Icon, Label } = props;

  const tabBarStyle = { ...defaultTabBarProps, ...props.tabBarStyle };

  const [beingPressed, setBeingPressed] = useState(false);

  const color = isFocused
    ? tabBarStyle.focusedColor
    : tabBarStyle.unfocusedColor;

  const isFocusedTransition = useSharedValue(0);

  useEffect(() => {
    isFocusedTransition.value = withTiming(isFocused ? 1 : 0);
    console.log("Changed focused", isFocused);
  }, [isFocused]);

  const tabEdge =
    -tabBarStyle.tabHeight / 2 +
    (props.invert ? -tabBarStyle.smallRadius : tabBarStyle.smallRadius);

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            isFocusedTransition.value,
            [0, 1],
            [tabBarStyle.buttonUnselectedScale, 1]
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
              tabBarStyle.canvasHeight,
              tabEdge +
                tabBarStyle.buttonSize / 2 +
                tabBarStyle.labelGap +
                tabBarStyle.radiusGap,
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
            size={tabBarStyle.buttonSize}
            focused={isFocused}
            beingPressed={beingPressed}
            baseColor={tabBarStyle.itemColor}
            inverted={props.invert}
          >
            <Icon
              color={color}
              focused={isFocused}
              size={(tabBarStyle.buttonSize / 4) * 3}
            />
          </IconWrapper>
        </Animated.View>
      ) : null}
      <Animated.View style={textStyle}>
        {Label ? (
          <Label
            color={tabBarStyle.textColor}
            focused={isFocused}
            children={""}
            position={"below-icon"}
          />
        ) : null}
      </Animated.View>
    </Pressable>
  );
}
