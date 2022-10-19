import { StyleSheet, View, Alert } from "react-native";
import React from "react";
import NotiButton from "./components/NotiButton";
import axios from "axios";
import { Button, TextInput } from "react-native-paper";
import * as Notifications from "expo-notifications";

import { ExpoPushMessages } from "../api/ExpoPushMessages";

export default LoginScreen = () => {
  const [userId, setUserId] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [token, setToken] = React.useState("");

  const LoginAxiosConfig = {
    baseURL: "http://192.168.0.10:3000",
    timeout: 30000,
    headers: {
      "content-type": "application/json",
    },
  };

  const LoginAxios = axios.create(LoginAxiosConfig);

  LoginAxios.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  LoginAxios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      Alert.alert(`Error: ${error}`);
      return Promise.reject(error);
    }
  );

  const onSubmit = async () => {
    let LoginUser = {
      userId: userId,
      userPwd: userPassword,
      token: token,
    };
    console.log(LoginUser);

    return await LoginAxios.post("/login", LoginUser);
  };

  return (
    <View>
      <TextInput
        placeholder={"아이디"}
        onChangeText={userId => setUserId(userId)}
        autoCapitalize="none"
        returnKeyType="next"
        onSubmitEditing={() =>
          passwordInputRef.current && passwordInputRef.current.focus()
        }
        underlineColorAndroid="#f000"
        blurOnSubmit={false}
      />
      <TextInput
        placeholder={"비밀번호"}
        onChangeText={password => setUserPassword(password)}
        autoCapitalize="none"
        returnKeyType="next"
        underlineColorAndroid="#f000"
        blurOnSubmit={false}
      />
      <Button
        style={{ height: 50 }}
        onPress={async () => {
          setToken((await Notifications.getExpoPushTokenAsync()).data);
          // setToken((await Notifications.getDevicePushTokenAsync()).data);
          let result = await onSubmit().data;
          console.log(`I'm the result`);
          console.log(result);

          ExpoPushMessages(result.token, `Your token is > ${result.token}`);
        }}
      >
        Login
      </Button>
      <NotiButton />
    </View>
  );
};

const styles = StyleSheet.create({});
