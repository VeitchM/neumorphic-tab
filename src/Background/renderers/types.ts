import {  ColorValue, LayoutRectangle } from "react-native";

export type RendererProps = {
  layout: LayoutRectangle;
  // Skia doesn't accept ColorValue type, it needs an issue
  // color: ColorValue; 
  color: string; // Should be ColorValue
  paths: string[];
  selected: number;
  simplify?:boolean;
};
