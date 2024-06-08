import { TabBarIcon, TabBarLabel, Tabs } from "./types";

export function convertNavigationProps(props: BottomTabBarProps) {
  const tabs: Tabs[] = [];

  props.state.routes.forEach((route) => {
    const screen = props.descriptors[route.key];
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
  };
}

type BottomTabBarProps = {
  state: {
    routes: {
      key: string;
      name: string;
    }[];
    index: number;
  };
  navigation: { navigate: (route: string) => void };
  descriptors: {
    [key: string]: {
      options: {
        tabBarIcon?: TabBarIcon;
        tabBarLabel?: TabBarLabel;
      };
    };
  };
};
