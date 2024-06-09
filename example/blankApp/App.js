import { StatusBar } from "expo-status-bar";
import { TabBar } from "neumorphic-tab";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [tabSelected, setTabSelected] = useState(0);

  const onSelectTab = (tab) => {
    // do stuff
    setTabSelected(tab);
  };

  return (
    <View style={styles.container}>
      <TabBar
        tabBarColor="#6666ff"
        itemColor="#ffffff"
        focusedColor="#6666ff"
        textColor="#ffffff"
        selected={tabSelected}
        buttonPadding={14}
        radiusGap={6}
        labelGap={12}
        buttonUnselectedScale={0.7}
        tabs={[
          {
            key:'1',
            Label: ({ color }) => <Text style={{ color }}>Tab1</Text>,
            Icon: ({ color }) => (
              <Text style={{ color, fontSize: 24, fontWeight: "800" }}>1</Text>
            ),
            onPress: () => onSelectTab(0),
          },
          {
            key:'2',
            Label: ({ color }) => <Text style={{ color }}>Tab2</Text>,
            Icon: ({ color }) => (
              <Text style={{ color, fontSize: 24, fontWeight: "800" }}>2</Text>
            ),
            onPress: () => onSelectTab(1),
          },
          {
            key:'3',
            Label: ({ color }) => <Text style={{ color }}>Tab3</Text>,
            Icon: ({ color }) => (
              <Text style={{ color, fontSize: 24, fontWeight: "800" }}>3</Text>
            ),
            onPress: () => onSelectTab(2),
          },
          {
            key:'4',
            Label: ({ color }) => <Text style={{ color }}>Tab4</Text>,
            Icon: ({ color }) => (
              <Text style={{ color, fontSize: 24, fontWeight: "800" }}>4</Text>
            ),
            onPress: () => onSelectTab(3),
          },
          {
            key:'5',
            Label: ({ color }) => <Text style={{ color }}>Tab5</Text>,
            Icon: ({ color }) => (
              <Text style={{ color, fontSize: 24, fontWeight: "800" }}>5</Text>
            ),
            onPress: () => onSelectTab(4),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
