import { ReactElement, ReactNode } from "react";
import defaultTabBarProps from "./const";

export type TabBarProps = Partial<typeof defaultTabBarProps>;

export type TabBarIcon = (props: {
  focused: boolean;
  color: string;
  size: number;
}) => ReactNode;

export type TabBarLabel =
  | string
  | ((props: {
      focused: boolean;
      color: string;
      children: string;
      position: "below-icon" | "beside-icon"
    }) => ReactNode)
  | undefined;

export type Tabs = {
  Icon?: TabBarIcon;
  Label?: TabBarLabel;
  key: string;
  onPress?: () => void;
};


export type TabBarProperties = typeof defaultTabBarProps & {bigRadius:number,tabHeight:number,canvasHeight:number}