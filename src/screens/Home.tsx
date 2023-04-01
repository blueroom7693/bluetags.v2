import {
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import useUser, { getAllBluecards } from "../axios";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import BottomFilter from "../components/bottomsheet/BottomFilter";
import axios from "axios";
import NFTlist from "../components/card/NFTlist";
import Loader from "../components/Loader";
import BluecardMedium from "../components/card/BluecardMedium";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Text } from "react-native";

//INTERFACE
interface HMediaProps {
  _id: string;
  createdAt: string;
  nft: string;
  thumbnail: string;
  fullData: any;
}
interface IProps {
  nftData: IInfo;
}
interface IData {
  _id: string;
  chain: string;
  nft: string;
  title: string;
  thumbnail: string;
  description: string;
  createdAt: string;
  likes: [string];
  unlikes: [string];
  SNS: string;
  bluecards: Object;
}

export interface IInfo {
  data: IData;
}

//CSS
const HomeContainer = styled.ScrollView`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${(props) => props.theme.Bg0dp};
`;

const NFTList = styled.FlatList`
  flex: 2;
  background-color: ${(props) => props.theme.Bg0dp};
`;

export const HListSeparator = styled.View`
  width: 20px;
  background-color: ${(props) => props.theme.Bg0dp};
`;
const HeaderTitle = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.Text0dp};
  margin-left: 30px;
  font-weight: 700;
  opacity: 0.5;
  margin-bottom: 16px;
  font-family: "SpoqaHanSansNeo-Regular";
`;
const SubHeaderTitle = styled.Text`
  font-size: 26px;
  color: ${(props) => props.theme.Text1dp};
  margin-left: 30px;
  margin-bottom: 3px;
  margin-top: 35px;
  font-family: "SpoqaHanSansNeo-Regular";
`;

// main
export default function Home({}) {
  // 유저정보
  const [user, setUser] = useState<string>();
  const isfoucsed = useIsFocused();
  useEffect(() => {
    if (isfoucsed) {
      axios.get("https://www.bluetags.app/api/users").then((res) => {
        console.log(res.data.calendar);
        setUser(res.data);
        // console.log(
        //   user.calendar.includes("638ef3120ee1a4a8991bf701"),
        //   12313564
        // );
      });
    }
    console.log("홈 페이지 들어옴");
  }, [isfoucsed]);
  //ProjectData
  const [projectData, setProjectData] = useState(null);
  const [newProjectData, setNewProjectData] = useState(null);
  //query
  const {
    isLoading: isLoadingNft,
    data: NftData,
    refetch: refetchHomeInfo,
  } = useQuery<IInfo>(["homeInfo"], getAllBluecards);
  //SETDATA
  const [data, setData] = useState<IData[]>();
  useEffect(() => {
    if (!isLoadingNft) {
      setData(Object.values(NftData.data.bluecards));
    }
  }, [isLoadingNft, NftData]);
  // data 분할
  useEffect(() => {
    axios.get("https://www.bluetags.app/api/projects").then((response) => {
      setProjectData(response.data.projects);
    });
  }, []);
  useEffect(() => {
    if (projectData) {
      const arr = [];
      for (let i = 0; i < projectData.length; i = i + 4) {
        arr.push(projectData.slice(i, i + 4));
      }
      setNewProjectData(arr);
    }
  }, [projectData]);
  // 새로고침
  const [refreshing, setRefreshing] = React.useState(false);
  const userSANGWAN = useUser();
  console.log(userSANGWAN);
  useEffect(() => {
    console.log(userSANGWAN.user);
  }, [userSANGWAN]);

  // const [calendarObject, setCalendarObject] = useState({});
  // useEffect(() => {
  //   calendarObject[`0222-020-2`] = [{ fullData: "FullData" }];
  //   console.log(calendarObject);
  // }, []);
  // console.log(calendarObject);

  // axios
  //   .get(`https://www.bluetags.app/api/bluecards?calendar=true&year=2023`)
  //   .then((res) => {
  //     res.data.bluecards.map((e) => {
  //       console.log(new Date(e.deadLineStart).toISOString().split("T")[0]);
  //       console.log(e);
  //     });
  //     // console.log(res.data.bluecards[1]);
  //   });
  console.log(user);

  //RETURN
  return isLoadingNft && !user ? (
    <Loader />
  ) : (
    <SafeAreaView style={styles.container}>
      <HomeContainer
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refetchHomeInfo} />
        }
      >
        {/* HEADER */}
        {/* <HeaderScroller /> */}
        {/* RECOMMEDED ARTICLE FLATLIST */}
        <SubHeaderTitle>BlueCard</SubHeaderTitle>
        <HeaderTitle>Large</HeaderTitle>
        <NFTList
          data={data}
          keyExtractor={(item) => item.id}
          horizontal={true}
          ItemSeparatorComponent={HListSeparator}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <BluecardMedium
              fullData={item}
              isBool={user?.calendar.includes(item.id)}
            />
          )}
        />
        {/* RECOMMEDED PROJECT FLATLIST */}
        <SubHeaderTitle>Project</SubHeaderTitle>
        <HeaderTitle>Large</HeaderTitle>
        <NFTList
          data={newProjectData}
          keyExtractor={(item) => item[0].id}
          horizontal={true}
          ItemSeparatorComponent={HListSeparator}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <NFTlist
              fullData={item}
              firstCard={item[0]}
              secondCard={item[1]}
              thirdCard={item[2]}
              forthCard={item[3]}
            ></NFTlist>
          )}
        />

        {/* RECOMMEDED ARTICLE FLATLIST */}
        <SubHeaderTitle>start with tags</SubHeaderTitle>
        <HeaderTitle>Recommended Article</HeaderTitle>
      </HomeContainer>
      <BottomFilter />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: "500",
    color: "white",
  },
  picker: {
    backgroundColor: "grey",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "black",
  },
});
