import { ColorValue, LayoutRectangle, View } from "react-native";
import { useMemo, useState } from "react";

import Item from "./Item/Item";
import Background from "./Background/Background";
import { TabBarProps } from "./types";
import defaultTabBarProps from "./const";

const { canvasHeight, tabHeight } = defaultTabBarProps;



/** Maybe i do it from scratch and consider using skia for everything in one canvas for performance improvement */

//TODO read
// const defaultTheme = { active: "purple", inactive: "gray" };

export default function TabBar(props: TabBarProps) {
  const [layout, setLayout] = useState<LayoutRectangle>();
  // const invert = props.invert ?? true;

  const params = useMemo(() => ({ ...defaultTabBarProps, ...props }), [props]);

  return (
    <View
      onLayout={(event) => setLayout(event.nativeEvent.layout)}
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        height: canvasHeight,
        alignItems: "flex-end",
        width: "100%",
        position: "absolute",
        bottom: 0,
      }}
    >
      {layout ? (
        <View
          style={{
            position: "absolute",
            width: "100%",
          }}
        >
          <Background
            layout={layout}
            selected={params.selected}
            tabs={params.length}
            invert={params.invert}
            color={params.tabBarColor}
            simplify={params.simplify}
          />
        </View>
      ) : null}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          height: tabHeight,
          width: "100%",
        }}
      >
        {params.tabs.map((tab, index) => {
          // const screen = params.descriptors[route.key];
          // const screen = params.descriptors[route.key];
          // const isFocused = params.state.index === index;
          return (
            <Item
              key={tab.key}
              isFocused={index===params.selected}
              // screen={screen}
              invert={params.invert}
              tabBarStyle={params}
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
