import { Button, StyleSheet } from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";

export default function NotiButton() {
  return (
    <Button
      title="10초 알림"
      onPress={() => {
        Notifications.scheduleNotificationAsync({
          content: {
            title: "Time's up!",
            body: "Change sides!",
          },
          trigger: {
            seconds: 10, //onPress가 클릭이 되면 10초 뒤에 알람이 발생합니다.
          },
        });
      }}
    ></Button>
  );
}

const styles = StyleSheet.create({});
