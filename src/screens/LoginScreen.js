import { StyleSheet, View, Alert } from "react-native";
import React from "react";
import NotiButton from "./components/NotiButton";
import axios from "axios";
import { Button, TextInput } from "react-native-paper";
import {
  registerForPushNotificationsAsync,
  schedulePushNotification,
} from "../api/PushNotificationAPI";
import { useNavigation } from "@react-navigation/native";

export default LoginScreen = () => {
  const [userId, setUserId] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [token, setToken] = React.useState("");

  const navi = useNavigation();

  React.useEffect(() => {
    async function getToken() {
      setToken(await registerForPushNotificationsAsync());
    }
    getToken();
  }, []);

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

    let result = await (await LoginAxios.post("/login", LoginUser)).data;
    console.log(`I'm the login result >`);
    console.log(result);

    //Login Notification >> 따로 메소드를 분리할까?
    if (result.status === "00") {
      schedulePushNotification(
        "Login Success!",
        "Your token is > ",
        await result.data.token
      );
      navi.navigate("Home");
    } else {
      schedulePushNotification(
        "Login Failed :(",
        "Please check your ID and Password"
      );
    }
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
          await onSubmit();
        }}
      >
        Login
      </Button>
      <NotiButton />
      <Button onPress={() => navi.navigate("OrderBook")}>Order Book</Button>
    </View>
  );
};

const styles = StyleSheet.create({});
