import Animated, {
  SharedValue,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import * as redash from "react-native-redash";

import { RendererProps } from "./types";
import { useEffect, useMemo } from "react";
import {
  Canvas,
  Path,
  Shadow,
  Skia,
  interpolatePaths,
  notifyChange,
} from "@shopify/react-native-skia";

const blur = 3;
const displacement = 1;

/** Using the same method as in SVG Renderer it destroy performance, handling strings may be the cause */

export default function SkiaRenderer(props: RendererProps) {

  const allPaths = useMemo(
    () => props.paths.map((path) => redash.parse(path)),
    [props.paths]
  );
  const transition = useSharedValue(0);

  const basePath = useMemo(() => allPaths[props.selected], [allPaths]);

  const paths = useSharedValue({
    previous: basePath,
    current: basePath,
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
  }, [props.selected]);

  return (
    <Canvas style={[props.layout]}>
      <Path path={path} color={props.color || "#5c21ff"} strokeWidth={2}>
        <Shadow
          dx={-displacement}
          dy={-displacement}
          blur={blur}
          color="#00000088"
          inner
        />
        <Shadow
          dx={displacement}
          dy={displacement}
          blur={blur}
          color="#ffffff55"
          inner
        />
      </Path>
    </Canvas>
  );
}
