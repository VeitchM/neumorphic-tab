import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { ReactNode } from "react";
import defaultTabBarProps from "./const";
import { LabelPosition } from "@react-navigation/bottom-tabs/lib/typescript/src/types";

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
    }) => React.ReactNode)
  | undefined;

export type Tabs = {
  Icon?: TabBarIcon;
  Label?: TabBarLabel;
  key: string;
  onPress?: () => void;
};
