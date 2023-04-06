import React, { useState, useEffect, useRef } from "react";
import { View, Appearance, Platform, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, Pallet } from "./src/utils/styled";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import MyDrawer from "./src/navigation/Drawer";
import AuthStack from "./src/navigation/AuthStack";
import { RecoilRoot, useRecoilState } from "recoil";
import { isLogined, token } from "./src/atom";
import DataProvider from "./src/context/DataProvider";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllNft, IData } from "./src/axios";
import { useFonts } from "expo-font";
import { Text } from "react-native";
/////push
import * as Notifications from "expo-notifications";
import { io } from "socket.io-client";
import * as Device from "expo-device";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
////////////////////////push

// NavigationBar.setBackgroundColorAsync("#1f1f1f");
SplashScreen.preventAutoHideAsync();

export interface IInfo {
  data: IData;
}

export default function App() {
  //////push
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    console.log(expoPushToken, 546446546546);

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  useEffect(() => {
    // registerForPushNotificationsAsync().then((token) =>
    //   console.log(token, 1213123545646)
    // );

    // 알림 리스너 설정
    // const notificationListener = Notifications.addNotificationReceivedListener(
    //   (notification) => {
    //     console.log("Received notification:", notification);
    //   }
    // );

    // WebSocket 연결 설정
    const websocket = io("https://gateway.bluetags.app", {
      withCredentials: true,
    });
    websocket.on("connect", () => {});
    websocket.on("chat message", (notification: Notification) => {
      // setNotification((prev) => [...prev, notification]);
      console.log(notification);
      // schedulePushNotification();
      displayNotification(notification.projectTitle, notification.projectTitle);
    });
    // 정리
    return () => {
      // notificationListener.remove();
      websocket.close();
    };
  }, []);

  //////push

  // 쿠키 확인 및 로그인 토큰
  const [isLogin, setIsLogin] = useRecoilState(isLogined);
  const [userToken, setUserToken] = useRecoilState(token);
  // splash screen
  const [appIsReady, setAppIsReady] = useState(false);
  //font
  const [fontsLoaded] = useFonts({
    "SpoqaHanSansNeo-Thin": require("./src/assets/fonts/SpoqaHanSansNeo-Thin.ttf"),
    "SpoqaHanSansNeo-Regular": require("./src/assets/fonts/SpoqaHanSansNeo-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        if (!fontsLoaded) {
          return;
        }
        await Font.loadAsync(Entypo.font);
        // async storage 토큰 확인
        const token = JSON.parse(await AsyncStorage.getItem("bluetags"));
        if (token !== (undefined || null)) {
          setIsLogin(true);
          setUserToken(token);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
    SplashScreen.hideAsync();
  }, [isLogin]);

  // QUERY CLIENT
  const queryClient = new QueryClient();

  // 테마 확인
  const [isLight, setIsLight] = useState(
    Appearance.getColorScheme() === "light"
  );
  Appearance.addChangeListener(() => {
    setIsLight(!isLight);
  });

  // 로그인 될 시
  return (
    <DataProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
          <NavigationContainer>
            <View style={{ flex: 1 }}>
              {/* {isLogin ? <MyDrawer /> : <AuthStack />} */}
              {/* <AuthStack /> */}
              {/* <MyDrawer /> */}
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <Text>Your expo push token: {expoPushToken}</Text>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Text>
                    Title: {notification && notification.request.content.title}{" "}
                  </Text>
                  <Text>
                    Body: {notification && notification.request.content.body}
                  </Text>
                  <Text>
                    Data:{" "}
                    {notification &&
                      JSON.stringify(notification.request.content.data)}
                  </Text>
                </View>
                <Button
                  title="Press to schedule a notification"
                  onPress={async () => {
                    await schedulePushNotification();
                  }}
                />
              </View>
            </View>
          </NavigationContainer>
        </ThemeProvider>
      </QueryClientProvider>
    </DataProvider>
  );
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  let token;

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    console.log(existingStatus);
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

async function displayNotification(title, body) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${title}에서 블루카드를 생성하였습니다`,
      body: body,
      data: { data: "Message data" },
    },
    trigger: null,
  });
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}
