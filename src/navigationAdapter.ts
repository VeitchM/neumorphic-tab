import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "./types";

export function convertNavigationProps(props: BottomTabBarProps) {
  const tabs: Tabs[] = [];

  props.state.routes.forEach((route, index) => {
    const screen = props.descriptors[route.key];
    const isFocused = props.state.index === index;
    tabs.push({
      Icon: screen.options.tabBarIcon,
      Label: screen.options.tabBarLabel,
      key: route.key,
      onPress: () => props.navigation.navigate(route.name),
    });
  });
  return {
    tabs,
    selected: props.state.index,
    length:props.state.routes.length
  };
}
