// Calculated or default

import defaultTabBarProps from "./const";
import { TabBarProperties, TabBarProps } from "./types";



export function getProperties(props?:TabBarProps): TabBarProperties {
    const dimensions = {...defaultTabBarProps,...props}
    const bigRadius = dimensions.buttonSize / 2 + dimensions.radiusGap;
    const tabHeight = dimensions.buttonSize * dimensions.buttonUnselectedScale + dimensions.buttonPadding * 2;
    const canvasHeight = tabHeight + bigRadius + dimensions.smallRadius + dimensions.marginForEffects;
    return {...dimensions,bigRadius,tabHeight,canvasHeight}
    // export const marginForEffects = 10 + bigRadius + smallRadius;
}
