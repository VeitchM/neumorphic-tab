import Animated, {
  SharedValue,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Circle, Svg, Path } from "react-native-svg";
import * as redash from "react-native-redash";

import { RendererProps } from "./types";
import { useEffect, useMemo } from "react";

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function SVGRenderer(props: RendererProps) {
  const allPaths = useMemo(
    () => props.paths.map((path) => redash.parse(path)),
    [props.paths]
  );
  const transition = useSharedValue(0);

  const paths = useSharedValue({
    previous: allPaths[props.selected],
    current: allPaths[props.selected],
  });

  const path = useDerivedValue(() => {
    return redash.interpolatePath(
      transition.value,
      [0, 1],
      [paths.value.previous, paths.value.current]
    );
  });

  useEffect(() => {
    paths.value = {
      previous: redash.parse(path.value),
      current: allPaths[props.selected],
    };

    transition.value = 0;
    transition.value = withTiming(1);
  }, [props]);

  const layout = useMemo(
    () => ({ width: props.layout.width, height: props.layout.height }),
    [props.layout]
  );

  return (
    <Svg style={layout}>
      <AnimatedPath fill={props.color} d={path} />
    </Svg>
  );
}
