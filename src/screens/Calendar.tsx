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

  // 필터링 및 데이터 정리 => deadline이 있는 블루카드만 추출
  const [filterdData, setFilteredData] = useState<IData[]>();
  const filter = (info) => {
    let isDeadLineBool: boolean = false;
    if (info.deadLineStart && info.deadLineEnd) {
      isDeadLineBool = true;
    }
    return isDeadLineBool;
  };
  useEffect(() => {
    if (allBluecards) {
      setFilteredData(Object.values(allBluecards).filter(filter));
    }
  }, [allBluecards]);

  // 시작과 끝 날짜 구하기 함수
  const [dateArray, setDateArray] = useState<string>();
  const getDatesStartToLast = (startDate, lastDate) => {
    setDateArray(null);
    const result = [];
    while (startDate <= lastDate) {
      result.push(startDate.toISOString().split("T")[0]);
      startDate.setDate(startDate.getDate() + 1);
    }
    setDateArray(result);
    // console.log(dateArray);
    return;
  };

  //출력하자
  useEffect(() => {
    if (allBluecards) {
      const startDate = new Date(allBluecards[0].deadLineStart);
      const endDate = new Date(allBluecards[0].deadLineEnd);
      getDatesStartToLast(startDate, endDate);
    }
  }, [allBluecards]);

  const sample = {
    "2023-02-02": [{ name: "item 1 - any js object" }],
    "2023-02-05": [{ name: "item 1 - any js object", height: 150 }],
    "2023-02-05": [{ name: "item 1 - any js object", height: 150 }],
    "2023-02-06": [{ name: "item 2 - any js object", height: 150 }],
    "2023-02-07": [{ name: "item 2 - any js object", height: 250 }],
    "2023-02-08": [
      { name: "item 3 - any js object" },
      { name: "any js object" },
    ],
  };

  return user && allBluecards ? (
    <Agenda
      renderEmptyDate={renderEmptyDate}
      //   items={{
      //     "2023-02-04": [
      //       {
      //         name: "item 1 - any js object",
      //         name2: "value",
      //         name3: "value",
      //         name4: "value",
      //       },
      //     ],
      //     "2023-02-02": [{ name: "item 1 - any js object" }],
      //     "2023-02-05": [{ name: "item 1 - any js object", height: 150 }],
      //     "2023-02-05": [{ name: "item 1 - any js object", height: 150 }],
      //     "2023-02-05": [{ name: "item 1 - any js object", height: 150 }],
      //     "2023-02-05": [{ name: "item 1 - any js object", height: 150 }],

      //     "2023-02-06": [{ name: "item 2 - any js object", height: 150 }],
      //     "2023-02-07": [{ name: "item 2 - any js object", height: 250 }],
      //     "2023-02-08": [
      //       { name: "item 3 - any js object" },
      //       { name: "any js object" },
      //     ],
      //   }}
      items={sample}
      renderItem={(item, firstItemInDay) => {
        console.log(item);
        return (
          <View>
            <Text>hi{item.height}</Text>
          </View>
        );
      }}
    />
  ) : null;
};

//render empty
const renderEmptyDate = () => {
  return (
    <View style={styles.emptyDate}>
      <Text>This is empty date!</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

export default CalendarPage;
