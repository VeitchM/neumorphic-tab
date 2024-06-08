import { Tabs } from "./types";

// export const size = 64;
const buttonSize = 64;
const radiusGap = 10;
const buttonPadding = 10;
const smallRadius = 10;

/** This can be calculated to stay center between bottom and icon, but i need font size */
const labelGap = 6;
const buttonUnselectedScale = 0.7;

// Calculated or default
const marginForEffects = 10;
const bigRadius = buttonSize / 2 + radiusGap;
const tabHeight = buttonSize * buttonUnselectedScale + buttonPadding * 2;
const canvasHeight = tabHeight + bigRadius + smallRadius + marginForEffects;
// export const marginForEffects = 10 + bigRadius + smallRadius;

const defaultTabBarProps = {
  buttonSize,
  radiusGap,
  buttonPadding,
  smallRadius,
  labelGap,
  buttonUnselectedScale,
  tabBarColor: "#d6d6d6",
  textColor: "#707070",
  itemColor: "#d6d6d6",
  focusedColor: "#303030",
  unfocusedColor: "#707070",
  marginForEffects,
  // bigRadius,
  // tabHeight,
  // canvasHeight,
  invert: false,
  simplify: false,

  selected: 0,
  tabs: new Array<Tabs>(),
};

export default defaultTabBarProps;
