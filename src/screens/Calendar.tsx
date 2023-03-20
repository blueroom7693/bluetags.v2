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
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import styled from "styled-components/native";
import CalendarCard from "../components/card/CalendarCard";

const LegendContainer = styled.View`
  width: 100%;
  height: 60px;
  position: absolute;
  z-index: 1;
  background-color: ${(props) => props.theme.Tabbar};
  bottom: 50px;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;
const LegendTitle = styled.Text`
  font-size: 14px;
  font-weight: 700;
`;
const LegendList = styled.View`
  flex-direction: row;
`;
const LegendDetailContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90px;
  background-color: ${(props) => props.theme.Bg0dp};
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 10px;
  margin-right: 5px;
  margin-left: 5px;
`;

interface Bluecard {
  id: string;
  title: string;
  thumbnail: string;
  summary: string;
  description: string;
  bluetags: string[];
  sns: string;
  createdAt: Date;
  deadLineStart: Date | null;
  deadLineEnd: Date | null;
  projectId: string;
  imgURL: string[];
  isUpload: boolean;
}
interface Project {
  id: string;
  key: string;
  chain: string;
  title: string;
  logoUrl: string;
  description: string | null;
  backGround: string;
}

interface BluecardWithProject extends Bluecard {
  project: Project;
  deadLineStart: Date;
  deadLineEnd: Date;
}
const CalendarPage = () => {
  const [month, setMonth] = useState<number>();
  const [year, setYear] = useState<number>();
  const [event, setEvent] = useState<number>();
  const [voting, setVoting] = useState<number>();
  const [minting, setMinting] = useState<number>();
  const [lang, setLang] = useState<number>();
  // 유저정보
  const [user, setUser] = useState<string>();
  // 전체 블루카드
  const [allBluecards, setallBluecards] = useState<BluecardWithProject[]>();
  //
  // 캘린더 오브젝트
  const [calendarObject, setCalendarObject] = useState({});
  // 전체 로딩
  const [loading, setLoading] = useState(false);
  ///////////////////////
  // 알림 받는 블루카드
  const [myBlucards, setMyBluecards] = useState();
  // 정보 업데이트
  const isfoucsed = useIsFocused();
  useEffect(() => {
    if (isfoucsed) {
      axios.get("https://www.bluetags.app/api/users").then((res) => {
        console.log(res.data.calendar);
        setUser(res.data);
        if (user) {
          // axios
          //   .get(`https://www.bluetags.app/api/bluecards?calendar=true`)
          //   .then((response) => {
          //     console.log(response.data);
          //     setallBluecards(response.data.bluecards);
          //     // setMyBluecards(response.data);
          //   });
        }
        axios
          .get(`https://www.bluetags.app/api/bluecards?calendar=true&year=2023`)
          .then((res) => {
            // setallBluecards(res.data.bluecards);
            // console.log(Object.values(res.data.bluecards));
            // console.log(res.data.bluecards);
            setallBluecards(res.data.bluecards);

            // setallBluecards(res.data.bluecards);
          });
      });
      setCalendarObject({});
      setLegend({});
      setLoading(false);
    }
    console.log("캘린더 페이지 들어옴");
  }, [isfoucsed]);

  // 필터링 및 데이터 정리 => deadline이 있는 블루카드만 추출
  // const [filterdData, setFilteredData] = useState();
  // const filtered = (info) => {
  //   let isDeadLineBool: boolean = false;
  //   if (info.deadLineStart && info.deadLineEnd) {
  //     isDeadLineBool = true;
  //   }
  //   return isDeadLineBool;
  // };
  // useEffect(() => {
  //   if (allBluecards) {
  //     setFilteredData(Object.values(allBluecards).filter(filtered));
  //   }
  // }, [allBluecards]);

  //범례(legend) 만들기
  const [legend, setLegend] = useState({});
  const makeLegend = (startdate, lastdate, data) => {
    // let bluetags = data.bluetags[0];
    let startdateYear = startdate.getFullYear();
    let startdateMonth = startdate.getMonth() + 1;
    let lastdateYear = lastdate.getFullYear();
    let lastdateMonth = lastdate.getMonth() + 1;

    while (startdateMonth <= lastdateMonth) {
      if (`${startdate.getFullYear()}-${startdateMonth}` in legend) {
        legend[`${startdateYear}-${startdateMonth}`] = [
          ...legend[`${startdate.getFullYear()}-${startdateMonth}`],
          { bluetags: data.bluetags[0], fulldata: data.id },
        ];
      } else {
        legend[`${startdateYear}-${startdateMonth}`] = [
          { bluetags: data.bluetags[0], fulldata: data.id },
        ];
      }
      startdateMonth = startdateMonth + 1;
    }
  };
  // 범례 수 세기
  useEffect(() => {
    if (user && allBluecards && loading) {
      if (legend[`${year}-${month}`]) {
        var event = legend[`${year}-${month}`].filter(
          (item) => item["bluetags"] === "event"
        );
        var minting = legend[`${year}-${month}`].filter(
          (item) => item["bluetags"] === "minting"
        );
        var voting = legend[`${year}-${month}`].filter(
          (item) => item["bluetags"] === "voting"
        );
        var lang = legend[`${year}-${month}`].filter(
          (item) => item["bluetags"] === "lang"
        );
        setEvent(event.length);
        setLang(lang.length);
        setMinting(minting.length);
        setVoting(voting.length);
      } else {
        setEvent(0);
        setLang(0);
        setVoting(0);
        setMinting(0);
      }
    }
  }, [month]);

  // 시작과 끝 날짜 구하기 함수

  const getDatesStartToLast = (startDate, lastDate, FullData) => {
    makeLegend(startDate, lastDate, FullData);
    while (startDate <= lastDate) {
      //new method
      if (startDate.toISOString().split("T")[0] in calendarObject) {
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
  function recap() {
    if (allBluecards) {
      console.log(allBluecards.length);
      allBluecards.map((e, index) =>
        getDatesStartToLast(
          new Date(e.deadLineStart),
          new Date(e.deadLineEnd),
          e
        )
      );
      setLoading(true);
    }
  }
  //데이터 출력준비 완료
  useEffect(() => {
    if (allBluecards) {
      recap();
    }
  }, [allBluecards]);

  // useEffect(() => {
  //   console.log(calendarObject);
  // }, [calendarObject]);
  // console.log(calendarObject);

  return user && allBluecards && loading ? (
    <View style={{ width: "100%", height: "100%" }}>
      <Agenda
        renderEmptyData={() => {
          return (
            <View>
              <Text>No Events</Text>
              <Text>
                You don't have any new incoming event at the moment! Check out
                other dates
              </Text>
            </View>
          );
        }}
        items={calendarObject}
        renderItem={(item, firstItemInDay) => (
          <CalendarCard fullData={item.fullData}></CalendarCard>
        )}
        onDayChange={(day) => {
          setMonth(day.month);
          setYear(day.year);
        }}
        onDayPress={(day) => {
          setMonth(day.month);
          setYear(day.year);
        }}
        onVisibleMonthsChange={(months) => {
          setMonth(months.month);
          setYear(months.year);
        }}
        pastScrollRange={24}
        futureScrollRange={24}
        theme={{}}
        // rowHasChanged={(r1, r2) => {
        //   return r1.text !== r2.text;
        // }}
      />

      <LegendContainer>
        <LegendTitle>
          Legend at {year}-{month}{" "}
        </LegendTitle>
        <LegendList>
          <LegendDetailContainer>
            <View
              style={{
                backgroundColor: "#64B5FF",
                height: 10,
                width: 10,
                borderRadius: 10,
              }}
            ></View>
            <Text>Event</Text>
            <Text>{event}</Text>
          </LegendDetailContainer>
          <LegendDetailContainer>
            <View
              style={{
                backgroundColor: "#ffa0d3",
                height: 10,
                width: 10,
                borderRadius: 10,
              }}
            ></View>
            <Text>Voting</Text>
            <Text>{voting}</Text>
          </LegendDetailContainer>
          <LegendDetailContainer>
            <View
              style={{
                backgroundColor: "#9dce99",
                height: 10,
                width: 10,
                borderRadius: 10,
              }}
            ></View>
            <Text>Minting</Text>
            <Text>{minting}</Text>
          </LegendDetailContainer>
          <LegendDetailContainer>
            <View
              style={{
                backgroundColor: "#fcc53a",
                height: 10,
                width: 10,
                borderRadius: 10,
              }}
            ></View>
            <Text>Lang</Text>
            <Text>{lang}</Text>
          </LegendDetailContainer>
        </LegendList>
      </LegendContainer>
    </View>
  ) : (
    <Calendar />
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
