import { ColorValue, LayoutRectangle, View } from "react-native";
import { useMemo, useState } from "react";

import Item from "./Item/Item";
import Background from "./Background/Background";
import { TabBarProps } from "./types";
import defaultTabBarProps from "./const";
import {  getProperties } from "./utils";

// const { canvasHeight, tabHeight } = defaultTabBarProps;



/** Tab Bar with neomorphic style
 * 
 */

//TODO read
// const defaultTheme = { active: "purple", inactive: "gray" };

export default function TabBar(props: TabBarProps) {
  const [layout, setLayout] = useState<LayoutRectangle>();
  // const invert = props.invert ?? true;

  const properties = useMemo(() => (getProperties(props)), [props]);

  return (
    <View
      onLayout={(event) => setLayout(event.nativeEvent.layout)}
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        height: properties.canvasHeight,
        alignItems: "flex-end",
        width: "100%",
        position: "absolute",
        bottom: 0,
      }}
    >
      {layout && properties.tabs.length? (
        <View
          style={{
            position: "absolute",
            width: "100%",
          }}
        >
          <Background
            layout={layout}
            selected={properties.selected}
            tabs={properties.tabs.length}
            properties={properties}
            color={properties.tabBarColor}
            simplify={properties.simplify}
          />
        </View>
      ) : null}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          height: properties.tabHeight,
          width: "100%",
        }}
      >
        {properties.tabs.map((tab, index) => {
          // const screen = properties.descriptors[route.key];
          // const screen = properties.descriptors[route.key];
          // const isFocused = properties.state.index === index;
          return (
            <Item
              key={tab.key}
              isFocused={index===properties.selected}
              // screen={screen}
              tabBarProperties={properties}
              Icon={tab.Icon}
              Label={tab.Label}
              onPress={tab.onPress}
            />
          );
        })}
      </View>
    </View>
  );
}
