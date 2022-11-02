import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider, Text } from "react-native-paper";
import * as Notifications from "expo-notifications";
import React from "react";
import * as Font from "expo-font";

import LoginScreen from "./src/screens/LoginScreen";
import Home from "./src/screens/Home";
import OrderBook from "./src/modules/orderBook/screens/OrderBook";
import MarketList from "./src/modules/marketList/screens/MarketList";

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [fontLoad, setFontLoad] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      await Font.loadAsync({
        "NotoSans-light": require("./assets/fonts/NotoSansKR-Light.otf"),
        "NotoSans-Bold": require("./assets/fonts/NotoSansKR-Bold.otf"),
      });
      setFontLoad(true);
    })();
  }, []);

  return fontLoad ? (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MarketList">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="OrderBook" component={OrderBook} />
          <Stack.Screen name="MarketList" component={MarketList} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  ) : (
    <View style={styles.loading}>
      <Text>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
