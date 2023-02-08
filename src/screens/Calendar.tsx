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
import styled from "styled-components/native";
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

const LegendContainer = styled.View`
  width: 100%;
  height: 40px;
  position: absolute;
  z-index: 1;
  background-color: #a8a8a830;
  bottom: 60px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const CalendarPage = () => {
  const SAMPLE = {
    "2023-02": {
      event: ["123", "2356"],
      minting: [],
    },
  };
  const thisMonth = "02";
  const thisYear = "2023";
  // console.log(SAMPLE);

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
      setCalendarObject({});
      setLoading(false);
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

  //범례(legend) 만들기
  const [legend, setLegend] = useState({});
  const makeLegend = (startdate, lastdate, data) => {
    const bluetags = data.bluetags[0];
    const startdateYear = startdate.getFullYear();
    const startdateMonth = startdate.getMonth();
    const lastdateYear = lastdate.getFullYear();
    const lastdateMonth = lastdate.getMonth();

    while (startdateYear < lastdateYear) {
      console.log("출력되면 안돼");
    }
    while (startdateMonth <= lastdateMonth) {
      legend[`${startdateYear}-${startdateMonth}`] = [
        // ...legend[`${startdate.getFullYear()}-${startdate.getMonth()}`],
        { bluetags: data.bluetags[0], fulldata: data },
      ];
      break;
    }
    console.log(legend);
  };

  // 시작과 끝 날짜 구하기 함수
  const [loading, setLoading] = useState(false);
  const [calendarObject, setCalendarObject] = useState({});
  const getDatesStartToLast = (startDate, lastDate, FullData) => {
    makeLegend(startDate, lastDate, FullData);
    while (startDate <= lastDate) {
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
  //   console.log(new Date().getDate() + 60);
  //빈 날짜 채우기
  //   const fillEmptyDate = () => {
  //     const today = new Date();
  //     // const past = new Date(today.setDate(today.getDate() - 90));
  //     // const future = new Date(today.setDate(today.getDate() + 90));
  //     const past = new Date(today.setDate(today.getDate() - 90));
  //     const future = new Date(today.setDate(today.getDate() + 180));
  //     while (past <= future) {
  //       if (past.toISOString().split("T")[0] in calendarObject) {
  //         past.setDate(past.getDate() + 1);
  //       } else {
  //         calendarObject[past.toISOString().split("T")[0]] = [];
  //         past.setDate(past.getDate() + 1);
  //       }
  //     }
  //   };

  //데이터 정리(비동기화)
  function recap() {
    if (filterdData) {
      filterdData.map(
        (e, index) =>
          getDatesStartToLast(
            new Date(e.deadLineStart),
            new Date(e.deadLineEnd),
            e
          )
        // fillEmptyDate()
      );
      setLoading(true);
    }
  }
  //데이터 출력준비 완료
  useEffect(() => {
    recap();
  }, [filterdData]);

  return user && allBluecards && loading ? (
    <View style={{ width: "100%", height: "100%" }}>
      <Agenda
        renderEmptyData={() => {
          return (
            <View>
              <Text>빈 페이지</Text>
            </View>
          );
        }}
        items={calendarObject}
        renderItem={(item, firstItemInDay) => (
          <CalendarCard fullData={item.fullData}></CalendarCard>
        )}
        onMonthChange={(month) => {
          console.log("month changed", month);
        }}
        pastScrollRange={24}
        futureScrollRange={24}
        //   showOnlySelectedDayItems
        //   markingType={"period"}
        //   markingType="multi-period"
        //   markedDates={{
        //     "2023-02-07": {
        //       periods: [
        //         { startingDay: false, endingDay: true, color: "#5f9ea0" },
        //         { startingDay: false, endingDay: true, color: "#ffa500" },
        //         { startingDay: true, endingDay: false, color: "#f0e68c" },
        //       ],
        //     },
        //     "2023-02-08": {
        //       periods: [
        //         { startingDay: true, endingDay: false, color: "#ffa500" },
        //         { color: "transparent" },
        //         { startingDay: false, endingDay: false, color: "#f0e68c" },
        //       ],
        //     },
        //   }}
        theme={
          {
            // "stylesheet.calendar.header": {
            //   dayTextAtIndex0: {
            //     color: "red",
            //   },
            //   dayTextAtIndex6: {
            //     color: "blue",
            //   },
            // },
            // selectedDayBackgroundColor: "#080e11",
            // dotColor: "#000000",
          }
        }
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
      <LegendContainer>
        <Text>Event</Text>
        <Text>{SAMPLE[`${thisYear}-${thisMonth}`].event.length}</Text>
        <Text>Minting</Text>
        <Text>{SAMPLE["2023-02"].minting.length}</Text>
        <Text>Voting</Text>
        {SAMPLE["2023-02"].voting ? (
          <Text>{SAMPLE["2023-02"].voting.length}</Text>
        ) : (
          <Text>0</Text>
        )}

        <Text>Lang</Text>
        <Text>hi</Text>
        <Text>hi</Text>
      </LegendContainer>
    </View>
  ) : (
    <Calendar />
  );
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
