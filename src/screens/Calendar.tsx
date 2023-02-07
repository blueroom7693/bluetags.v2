import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars"; // import { Calendar } from "react-native-big-calendar";
import CalendarCard from "../components/card/CalendarCard";

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
  const [loading, setLoading] = useState(false);
  const [calendarObject, setCalendarObject] = useState({});
  const getDatesStartToLast = (startDate, lastDate, FullData) => {
    while (startDate <= lastDate) {
      //   calendarObject[startDate.toISOString().split("T")[0]] = [
      //     {
      //       fullData: FullData,
      //     },
      //   ];
      //   console.log([startDate.toISOString().split("T")[0]] in calendarObject);
      //new method
      if ([startDate.toISOString().split("T")[0]] in calendarObject) {
        calendarObject[startDate.toISOString().split("T")[0]] = [
          ...calendarObject[startDate.toISOString().split("T")[0]],
          { fullData: FullData },
        ];
      } else {
        calendarObject[startDate.toISOString().split("T")[0]] = [
          {
            fullData: FullData,
          },
        ];
      }

      startDate.setDate(startDate.getDate() + 1);
    }
    return;
  };

  //데이터 정리(비동기화)
  async function recap() {
    if (filterdData) {
      filterdData.map((e) =>
        getDatesStartToLast(
          new Date(e.deadLineStart),
          new Date(e.deadLineEnd),
          e
        )
      );
    }
  }

  //데이터 출력준비 완료
  useEffect(() => {
    recap().then(() => setLoading(true));
  }, [filterdData]);

  return user && allBluecards && loading ? (
    <Agenda
      renderEmptyDate={renderEmptyDate}
      items={calendarObject}
      renderItem={(item, firstItemInDay) => (
        <CalendarCard fullData={item.fullData}></CalendarCard>
      )}
      pastScrollRange={24}
      futureScrollRange={24}
      rowHasChanged={(r1, r2) => {
        return r1.text !== r2.text;
      }}
      //   theme={{
      //     agendaDayTextColor: "yellow",
      //     agendaDayNumColor: "green",
      //     agendaTodayColor: "red",
      //     agendaKnobColor: "blue",
      //   }}
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
