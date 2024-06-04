import { View } from "react-native";

import { memo, ReactNode, useCallback, useEffect, useMemo } from "react";
import {
  convertToRGBA,
  Easing,
  LinearTransition,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import * as redash from "react-native-redash";
import {
  Canvas,
  Circle,
  Color,
  LinearGradient,
  Shadow,
  interpolateColors,
  vec,
} from "@shopify/react-native-skia";

export default memo(IconWrapper);

function IconWrapper(props: {
  children: ReactNode;
  size: number;
  baseColor: Color;
  focused?: boolean;
  beingPressed?: boolean;
  inverted?: boolean;
}) {
  const blur = props.inverted ? 6 : 2;
  const displacement = 1;
  const canvasSize = props.size + blur * 3;

  const { getGradientColors } = useColorGradients(props.baseColor);

  const transition = useSharedValue(1);
  const prevGradientColor = useSharedValue(
    getGradientColors(!!props.beingPressed, !!props.focused)
  );

  const newGradientColor = useSharedValue(prevGradientColor.value);

  const animatedGradient = useDerivedValue(() => {
    const colors: [Color, Color] = [
      interpolateColors(
        transition.value,
        [0, 1],
        [prevGradientColor.value[0], newGradientColor.value[0]]
      ),
      interpolateColors(
        transition.value,
        [0, 1],
        [prevGradientColor.value[1], newGradientColor.value[1]]
      ),
    ];
    return colors;
  });

  useMemo(() => {
    prevGradientColor.value = animatedGradient.value;
    newGradientColor.value = getGradientColors(
      !!props.beingPressed,
      !!props.focused
    );
    transition.value = 0;
    transition.value = withTiming(1, {
      duration: 300,
      easing: Easing.linear,
    });

    return;
  }, [props.beingPressed]);

  return (
    <View
      style={{
        width: props.size,
        height: props.size,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Canvas
        style={{
          position: "absolute",
          width: canvasSize,
          height: canvasSize,
        }}
      >
        <Circle r={props.size / 2} cx={canvasSize / 2} cy={canvasSize / 2}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(canvasSize, canvasSize)}
            colors={animatedGradient}
          />
          <Shadow
            dx={-displacement}
            dy={-displacement}
            // blur={blur / 2}
            blur={1.5}
            color="#ffffff77"
            inner={!props.inverted}
          />
          <Shadow
            dx={displacement}
            dy={displacement}
            // blur={blur / 2}
            blur={1.5}
            color="#00000077"
            inner={!props.inverted}
          />
        </Circle>
      </Canvas>
      {props.children}
    </View>
  );
}

function useColorGradients(baseColor: Color) {
  const gradientColors = useMemo(
    () => createGradientColors(baseColor),
    [baseColor]
  );
  const getGradientColors = useCallback(
    (pressed: boolean, focussed: boolean) => {
      if (!pressed && !focussed) return gradientColors.notPressed;
      if (!pressed && focussed) return gradientColors.focussed;
      if (pressed && !focussed) return gradientColors.pressed;
      return gradientColors.focussedAndPressed;
    },
    [gradientColors]
  );

  return { gradientColors, getGradientColors };
}

function createGradientColors(baseColor: Color) {
  const gradientBaseColors = [
    interpolateColors(0.5, [0, 1], ["#000000", baseColor]),
    baseColor,
    interpolateColors(0.5, [0, 1], ["#FFFFFF", baseColor]),
  ];

  const gradientColorsPartial = {
    pressed: [
      interpolateColors(0, [0, 0.5, 1], gradientBaseColors),
      interpolateColors(1, [0, 0.5, 1], gradientBaseColors),
    ] as [Color, Color],
    notPressed: [
      interpolateColors(0.75, [0, 0.5, 1], gradientBaseColors),
      interpolateColors(0.25, [0, 0.5, 1], gradientBaseColors),
    ] as [Color, Color],
    focussed: [
      interpolateColors(0.7, [0, 0.5, 1], gradientBaseColors),
      interpolateColors(0.3, [0, 0.5, 1], gradientBaseColors),
    ] as [Color, Color],
  };

  const gradientColors = {
    ...gradientColorsPartial,
    focussedAndPressed: [
      interpolateColors(
        0.5,
        [0, 1],
        [gradientColorsPartial.focussed[0], gradientColorsPartial.pressed[0]]
      ),
      interpolateColors(
        0.5,
        [0, 1],
        [gradientColorsPartial.focussed[1], gradientColorsPartial.pressed[1]]
      ),
    ] as [Color, Color],
  } as const;
  return gradientColors;
}
