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
  //날짜 예시
  const [date, setDate] = useState(null);
  // 유저정보
  const [user, setUser] = useState<string>();
  // 전체 블루카드
  const [allBluecards, setallBluecards] = useState<string[]>();
  // 알림 받는 블루카드
  const [myBlucards, setMyBluecards] = useState();
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

  // 시작과 끝 날짜 구하기 함수
  const getDatesStartToLast = (startDate, lastDate) => {
    const result = [];
    while (startDate <= lastDate) {
      result.push(startDate.toISOString().split("T")[0]);
      //   result.push(startDate.split("T")[0]);
      startDate.setDate(startDate.getDate() + 1);
      console.log(startDate);
      //   startDate.setDate(startDate.getDate() + 1);
    }
    return result;
  };

  //
  useEffect(() => {
    if (allBluecards) {
      //   console.log(Object.values(allBluecards.title));
      //   console.log(allBluecards[0].deadLineEnd.split("T")[0]);
      //   console.log(new Date(allBluecards[0].deadLineEnd).getDate() + 1);
      //   console.log(new Date(allBluecards[0].deadLineStart).getDate() + 1);
      const startDate = new Date(allBluecards[0].deadLineStart);
      const endDate = new Date(2023, 1, 3);
      //   console.log(startDate);

      getDatesStartToLast(startDate, endDate);
      //   getDatesStartToLast(
      //     new Date(allBluecards[0].deadLineStart),
      //     allBluecards[0].deadLineEnd
      //   );

      //   console.log(new Date(allBluecards[0].deadLineEnd).getFullYear(), 2023);
      //   console.log(new Date(allBluecards[0].deadLineEnd).getMonth() + 1, 1);
      //   console.log(new Date(allBluecards[0].deadLineEnd).getDate());
      //   console.log(allBluecards[0].deadLineEnd.slice(0, 10));
      //   setDate(allBluecards[0].deadLineEnd.slice(0, 10));
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
