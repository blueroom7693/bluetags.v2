import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars"; // import { Calendar } from "react-native-big-calendar";

// const events = [
//   {
//     title: "Meeting",
//     start: new Date(2020, 1, 11, 10, 0),
//     end: new Date(2020, 1, 11, 10, 30),
//   },
//   {
//     title: "Coffee break",
//     start: new Date(2020, 1, 11, 15, 45),
//     end: new Date(2020, 1, 11, 16, 30),
//   },
// ];

const CalendarPage = () => {
  // 유저정보
  const [user, setUser] = useState<string>();
  // 전체 블루카드
  const [allBluecards, setallBluecards] = useState<string[]>();
  // 알림 받는 블루카드
  const [myBlucards, setMyBluecards] = useState();
  const [isLoadingNft, setIsLoadingNft] = useState(true);
  //유저정보 업데이트
  const isfoucsed = useIsFocused();
  useEffect(() => {
    if (isfoucsed) {
      axios.get("https://www.bluetags.app/api/users").then((res) => {
        setUser(res.data);
        if (user) {
          //   axios
          //     .get(`https://www/bluetags.app/api/bluecards?user=${user.id}`)
          //     .then((response) => {
          //       //   console.log(response);
          //       setMyBluecards(response.data);
          //     });
        }
      });

      axios.get(`https://www.bluetags.app/api/bluecards`).then((respose) => {
        setallBluecards(respose.data.bluecards);
      });
    }
    console.log("캘린더 페이지 들어옴");
  }, [isfoucsed]);
  useEffect(() => {
    if (allBluecards) {
      //   console.log(Object.values(allBluecards.title));
      console.log(allBluecards[0].deadLineEnd);
      //   console.log(`${new Date(
      //           fullData.createdAt
      //         ).toDateString()}`);
      //   console.log(new Date(allBluecards[0].deadLineEnd).toString());
      console.log(new Date(allBluecards[0].deadLineEnd).getUTCDate());
      console.log(new Date(allBluecards[0].deadLineEnd).getUTCMonth());
      console.log(new Date(allBluecards[0].deadLineEnd).getFullYear());
      console.log(new Date(allBluecards[0].deadLineEnd).getMonth());
    }
  }, [allBluecards]);

  return user && allBluecards ? (
    <Agenda
      items={{
        "2023-02-04": [
          {
            name: "item 1 - any js object",
            name2: "value",
            name3: "value",
            name4: "value",
          },
        ],
        "2023-02-02": [{ name: "item 1 - any js object" }],
        "2023-02-05": [{ name: "item 1 - any js object", height: 150 }],
        "2023-02-05": [{ name: "item 1 - any js object", height: 150 }],
        "2023-02-05": [{ name: "item 1 - any js object", height: 150 }],
        "2023-02-05": [{ name: "item 1 - any js object", height: 150 }],

        "2023-02-06": [{ name: "item 2 - any js object", height: 150 }],
        "2023-02-07": [{ name: "item 2 - any js object", height: 250 }],
        "2023-02-08": [
          { name: "item 3 - any js object" },
          { name: "any js object" },
        ],
      }}
      renderItem={(item, firstItemInDay) => {
        return (
          <View>
            <Text>hi</Text>
          </View>
        );
      }}
    />
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CalendarPage;
