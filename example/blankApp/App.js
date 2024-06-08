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
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <TabBar
        {...{
          'tabBarColor':'#6666ff',
          'itemColor':'#ffffff',
          'focusedColor':'#ffffff',
          'textColor':'#ffffff',
          
          selected:tabSelected,
          'buttonPadding':20,
          'labelGap':14,
          tabs: [
            {
              Label: ()=> <Text >Tab1</Text>,
              Icon: ()=><Text style={{'fontSize':24, 'fontWeight':'800'}}>1</Text>,
              onPress:()=>onSelectTab(0)
            },
            {
              Label: ()=> <Text>Tab2</Text>,
              Icon: ()=><Text>2</Text>,
              onPress:()=>onSelectTab(1)
            },
            {
              Label: ()=> <Text>Tab3</Text>,
              Icon: ()=><Text>3</Text>,
              onPress:()=>onSelectTab(2)
            },   {
              Label: ()=> <Text>Tab4</Text>,
              Icon: ()=><Text>4</Text>,
              onPress:()=>onSelectTab(3)
            },   {
              Label: ()=> <Text>Tab5</Text>,
              Icon: ()=><Text>5</Text>,
              onPress:()=>onSelectTab(4)
            },
          ],
          length: 5,
        }}
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
