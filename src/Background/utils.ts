import { LayoutRectangle } from "react-native";
import defaultTabBarProps from "../const";

const { bigRadius, canvasHeight,  smallRadius, tabHeight } =
  defaultTabBarProps;

export const createSVG = (
  selected: number,
  tabs: number,
  layout: LayoutRectangle | undefined,
  invert?: boolean
) => {
  const bigArc = (r: number, initX: number, initY: number, invert?: boolean) =>
    ` A ${r} ${r} 0 0 ${invert ? "1" : "0"} ${initX + 2 * r} ${initY}`;
  const smallArc = (
    r: number,
    initX: number,
    initY: number,
    rightSide?: boolean,
    invert?: boolean
  ) =>
    ` A ${r} ${r} 0 0 ${invert ? "0" : "1"} ${initX + r} ${
      initY + (!invert !== !rightSide ? -r : r)
    } `;

  //   const layout = props.layout;
  // console.log("Layout", layout);
  const x = 0;
  //   const y = marginForEffects;
  const y = canvasHeight - tabHeight;
  const w = layout?.width || 600;
  // console.log("The layout is ", layout);

  const h = layout?.height || 200;

  const completeArc = (index: number, isSelected: boolean) => {
    const startArcPoint = (w / tabs) * (index + 0.5);

    // const localBigRadius = isSelected ? bigRadius : 0.01;
    const localBigRadius = isSelected ? bigRadius : 0.1;
    // const localSmallRadius = isSelected ? smallRadius : 0.01;
    const localSmallRadius = isSelected ? smallRadius : 0.1;

    return ` L ${startArcPoint - localSmallRadius - localBigRadius} ${y} 
          ${smallArc(
            localSmallRadius,
            startArcPoint - localSmallRadius - localBigRadius,
            y,
            false,
            invert
          )}
          ${bigArc(
            localBigRadius,
            startArcPoint - localBigRadius,
            y + (invert ? -localSmallRadius : localSmallRadius),
            invert
          )}
          ${smallArc(
            localSmallRadius,
            startArcPoint + localBigRadius,
            y + (invert ? -localSmallRadius : localSmallRadius),
            true,
            invert
          )}`;
  };
  let Arcs = " ";
  for (let index = 0; index < tabs; index++) {
    Arcs += completeArc(index, index === selected);
  }

  return `M ${x} ${y} ${Arcs}
      L ${x + w} ${y} L ${x + w}  ${y + h} L ${x} ${y + h} L ${x} ${y} `;
};
