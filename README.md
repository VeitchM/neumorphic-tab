# Neumorphic Tab

[![Reanimated v3 version](https://img.shields.io/github/package-json/v/gorhom/react-native-bottom-sheet/master?label=Reanimated%20v2&style=flat-square)](https://www.npmjs.com/package/neumorphic-tab) [![npm](https://img.shields.io/npm/l/@gorhom/bottom-sheet?style=flat-square)](https://www.npmjs.com/package/neumorphic-tab) [![npm](https://img.shields.io/badge/types-included-blue?style=flat-square)](https://www.npmjs.com/package/neumorphic-tab) [![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/)

A react native bottom tab with a neumorphic style.

![React Native Neumorphic Tab](./demo.gif)

## Installation

### Dependencies

This library needs these dependencies to be installed in your project before you can use it:

```bash
npx expo install react-native-reanimated @shopify/react-native-skia react-native-redash
```

Using Expo?

```bash
npm install react-native-reanimated react-native-gesture-handler @shopify/react-native-skia
```

## Features 
              
- Compatible with `Reanimated` v3.
- Compatible with `Skia`.
- Compatible with `Expo`.
- Compatible with `react-native-navigation`
- Compatible with `expo-router`
- Accessibility support.
- Written in `TypeScript`.

## Usage


### Parameters




### Using react-native-navigation

```JSX

import { TabBar, convertNavigationProps } from "neumorphic-tab";

...

 <Tab.Navigator
        

          // The TabBar component is mean to be used in this property, there you can customize as you want
          tabBar={(props) => (
            <TabBar
              invert
              
              // convertNavigationProps is a function used to adapt this library with the navigation props. 
              {...convertNavigationProps(props)}
              
              // The properties below are optional, there are default values.
              itemColor={theme.colors.primary}
              focusedColor={theme.colors.onBackground}
              unfocusedColor={theme.colors.onSurfaceDisabled}
              textColor={theme.colors.onBackground}
              tabBarColor={theme.colors.backgroundSecondary}
            />
          )}
        >
          <Tab.Screen
            name="Pomodoro"
            component={PomodoroScreen}
            options={{
              tabBarLabel: ({ focused, color }) => (
                <Text variant="titleMedium" style={{ color }}>
                  Pomodoro
                </Text>
              ),
              tabBarIcon: ({ focused, color, size }) => (
                <MaterialCommunityIcons
                  size={size}
                  name="timer"
                  color={color}
                  focused={focused}
                />
              ),
            }}
          />

          ...

        </Tab.Navigator>

```

### Using expo-router

As expo-router is based in react-navigation the code is the same



```JSX
Example expo 51 app 

./src/_layout.tsx


import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// This line is need to be added
import { TabBar , convertNavigationProps} from 'neumorphic-tab';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      // These lines are need to be added
      tabBar={(props)=>{
        return <TabBar 
        {...convertNavigationProps(props)}
        // Customization props could be added here
        />}}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```



## Author

- [Matias Veitch](https://matiasveitch.com.ar/)

## Inspiration

- Inspired by [neumorphism.io](https://neumorphis.io) 
- This library uses skia and it was made by trying skia features.

## License

[MIT](./LICENSE)