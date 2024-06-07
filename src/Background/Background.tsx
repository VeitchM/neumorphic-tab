import { ColorValue, LayoutRectangle } from "react-native";
import { useEffect, useMemo } from "react";

import { createSVG } from "./utils";
import SVGRenderer from "./renderers/SVGRenderer";
import SkiaRenderer from "./renderers/SkiaRenderer";
import defaultTabBarProps from "../const";
import { TabBarProperties } from "../types";

const defaultColor = defaultTabBarProps.tabBarColor;

export default function Background(props: {
  layout: LayoutRectangle;
  selected: number;
  tabs: number;
  color?: ColorValue;
  simplify?: boolean;
  properties:TabBarProperties
}) {
  const allPaths = useMemo(() => {
    console.log("Reprocessed SVGs");
    let allPaths = new Array<string>();
    for (let index = 0; index < props.tabs; index++) {
      allPaths.push(createSVG(index, props.tabs, props.layout, props.properties));
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
      simplify={props.simplify}
    />
  );
}

// const AnimatedPath = Animated.createAnimatedComponent(Path);
