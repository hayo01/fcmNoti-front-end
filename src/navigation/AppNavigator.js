import * as Notifications from "expo-notifications";
import * as expoPushTokensApi from "../api/ExpoPushTokens";
import * as Device from "expo-device";

import { Alert, Platform } from "react-native";

export const registerForPushNotificationsAsync = async () => {
  if (!Device.isDevice) {
    throw new Error(
      "Sorry, Push Notifications are only supported on physical devices."
    );
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    Alert.alert("Failed to get push token for push notification!");
    return;
  }
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);
  setState({ expoPushToken: token });

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
  }),
});

const AppNavigator = () => {
  useEffect(() => {
    registerForPushNotificationsAsync().then(token =>
      expoPushTokensApi.register(token)
    );
  }, []);
};
