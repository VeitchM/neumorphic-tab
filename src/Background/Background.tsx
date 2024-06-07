import { ColorValue, LayoutRectangle } from "react-native";
import { useEffect, useMemo } from "react";

import { createSVG } from "./utils";
import SVGRenderer from "./renderers/SVGRenderer";
import SkiaRenderer from "./renderers/SkiaRenderer";
import defaultTabBarProps from "../const";

const defaultColor = defaultTabBarProps.tabBarColor;

export default function Background(props: {
  layout: LayoutRectangle;
  selected: number;
  tabs: number;
  color?: ColorValue;
  invert?: boolean;
  simplify?: boolean;
}) {
  const allPaths = useMemo(() => {
    console.log("Reprocessed SVGs");
    let allPaths = new Array<string>();
    for (let index = 0; index < props.tabs; index++) {
      allPaths.push(createSVG(index, props.tabs, props.layout, props.invert));
    }
    return allPaths;
  }, [props.layout, props.tabs]);

  // return props.simplify ? (
  //   <SVGRenderer
  //     paths={allPaths}
  //     selected={props.selected}
  //     color={props.color?.toString() || defaultColor}
  //     layout={props.layout}
  //   />
  // ) : (
  return (
    <SkiaRenderer
      paths={allPaths}
      selected={props.selected}
      color={props.color?.toString() || defaultColor}
      layout={props.layout}
    />
  );
}

// const AnimatedPath = Animated.createAnimatedComponent(Path);
