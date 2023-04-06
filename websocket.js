import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { io } from "socket.io-client";
import * as Device from "expo-device";

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();

    // 알림 리스너 설정
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Received notification:", notification);
      }
    );

    // WebSocket 연결 설정
    const websocket = io(process.env.GATEWAY, {
      withCredentials: true,
    });
    websocket.onmessage = (event) => {
      if (data !== undefined) {
        const data = JSON.parse(event.data);
        if (data.type === "PUSH_NOTIFICATION") {
          displayNotification(data.title, data.body);
        }
      }
    };

    // 정리
    return () => {
      notificationListener.remove();
      websocket.close();
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use a physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  async function displayNotification(title, body) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        data: { data: "Message data" },
      },
      trigger: null,
    });
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Push Notifications with WebSockets in React Native and Expo!</Text>
    </View>
  );
}
