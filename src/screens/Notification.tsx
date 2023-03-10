import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import NotificationCard from "../components/card/NotificationCard";

const NotificationList = styled.FlatList``;
export default function Notification() {
  //유저정보 업데이트
  const isfoucsed = useIsFocused();

  const [user, setUser] = useState<string>();
  const [notificationData, setNotificationData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  console.log(new Date());

  useEffect(() => {
    if (isfoucsed) {
      axios.get("https://www.bluetags.app/api/users").then((res) => {
        setUser(res.data);
        axios
          .get(`https://www.bluetags.app/api/notifications`)
          .then((response) => {
            setNotificationData(response.data.notifications);
            // console.log(response.data.notifications);
            // setNotificationData(Object.values(respose.data));
            // console.log(Object.values(respose.data.bluecards));
          });
        setIsLoading(false);
      });
    }
    console.log("알림 페이지 들어옴");
  }, [isfoucsed]);
  return isLoading ? (
    <SafeAreaView style={styles.container}>
      <Text>isLoading</Text>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.container}>
      <NotificationList
        data={notificationData}
        renderItem={({ item }) => (
          <NotificationCard fullData={item}></NotificationCard>
        )}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "white",
  },
});
