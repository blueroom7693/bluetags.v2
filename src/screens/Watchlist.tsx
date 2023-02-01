import { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Image,
  ViewBase,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import styled from "styled-components/native";
import HeaderScroller from "../components/HeaderScroller";
import BottomFilter from "../components/bottomsheet/BottomFilter";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { axiosInstance } from "../axiosInstance";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  allSubscirbeProject,
  chainString,
  pastString,
  projectString,
  snstString,
  subscirbeProject,
  todayString,
  token,
} from "../atom";
import { IUser } from "../context/DataProvider";
import useUser, { getAllBluecards, getAllNft, getUser, IData } from "../axios";
import { IInfo } from "./Detail";
import MiddleVCard from "../components/card/MiddleVCard";
import { AllNftNonChain } from "../AllNft";
import CircleCard from "../components/card/CircleCard";
import SmallCircleCard from "../components/card/SmallCircleCard";
import SquareCard from "../components/card/SquareCard";
import { useIsFocused } from "@react-navigation/native";

//CSS
const ContentsList = styled.FlatList`
  background-color: ${(props) => props.theme.Bg0dp};
  /* width: 100%; */
`;

const ProjectScroller = styled.FlatList`
  background-color: ${(props) => props.theme.Bg0dp};
  border-color: ${(props) => props.theme.BgBorder};
  height: 100px;
  margin-top: 20px;
  /* flex: 0.23; */
  /* border-bottom-width: 1px; */
  /* width: 100%; */
`;
const HListSeparator = styled.View`
  width: 30px;
  background-color: ${(props) => props.theme.Bg0dp};
`;

//CSS FIRST COMPONENTS
const AllProject = styled.TouchableOpacity`
  width: 48px;
  height: 66px;
  border-radius: 40px;
  background-color: ${(props) => props.theme.Bg0dp};
  justify-content: center;
  align-items: center;
  /* margin-top: 20px; */
  margin-right: 30px;
`;

const AllProjectText = styled.Text`
  font-size: 15px;
`;

const Watchlist = ({ navigation, router }) => {
  //THEME
  const isDark = useColorScheme() === "dark";
  //query - 전체블루카드
  const { isLoading: isLoadingNft, data: NftData } = useQuery<IInfo>(
    ["homeInfo"],
    getAllBluecards
  );
  // 구독리스트
  const [subscribeProject, setSubscribeProject] = useState<string[]>();
  //유저정보 업데이트
  const isfoucsed = useIsFocused();
  useEffect(() => {
    if (isfoucsed) {
      axios
        .get("https://www.bluetags.app/api/users")
        .then((res) => setSubscribeProject(res.data.subscribe));
      console.log("페이지 들어옴");
    }
  }, [isfoucsed]);

  //RECOILVALUE
  const chain = useRecoilValue(chainString);
  const [project, setProject] = useRecoilState(projectString);
  const sns = useRecoilValue(snstString);
  const today = useRecoilValue(todayString);
  const past = useRecoilValue(pastString);
  const subscribe = useRecoilValue(allSubscirbeProject);
  //Filter
  // const Watchlistfilter = (info: IData) => {
  //   let chainBool: boolean = true;
  //   let projectBool: boolean = true;
  //   let snsBool: boolean = true;
  //   let dateBool: boolean = true;
  //   let subscribeBool: boolean = true;
  //   const date = new Date(Date.parse(info.createdAt)).getTime();
  //   if (chain !== "") {
  //     chainBool = info.project.chain === chain.toUpperCase();
  //   }
  //   if (project !== "") {
  //     projectBool =
  //       info.project.title ===
  //       project
  //         .toLowerCase()
  //         .replace(/ /gi, "")
  //         .replace(/-/gi, "")
  //         .replace(/`/gi, "");
  //   }
  //   if (sns !== "") {
  //     snsBool = info.sns === sns;
  //   }
  //   if (today.getTime() - date < 0 || date - past.getTime() < 0) {
  //     dateBool = false;
  //   }
  //   if (subscribe.length !== 0) {
  //     subscribeBool = subscribe.includes(
  //       info.project.title
  //         .toLowerCase()
  //         .replace(/ /gi, "")
  //         .replace(/-/gi, "")
  //         .replace(/`/gi, "")
  //     );
  //   }
  //   return chainBool && projectBool && snsBool && dateBool && subscribeBool;
  // };
  //SETDATA
  const [data, setData] = useState<IData[]>();
  useEffect(() => {
    if (!isLoadingNft) {
      setData(Object.values(NftData.data.bluecards));
    }
  }, [isLoadingNft, NftData]);

  // useEffect(() => {
  //   if (!isLoadingNft) {
  //     setData(Object.values(NftData?.data.bluecards).filter(Watchlistfilter));
  //   }
  // }, [chain, project, sns, today, past, subscribe, NftData]);

  return isLoadingNft ? null : (
    <SafeAreaView style={styles.container}>
      {/* <HeaderScroller /> */}
      {subscribeProject ? (
        <ProjectScroller
          data={subscribeProject}
          keyExtractor={(item) => item}
          horizontal={true}
          ItemSeparatorComponent={HListSeparator}
          contentContainerStyle={{ paddingHorizontal: 30 }}
          // ListHeaderComponent={
          //   <AllProject>
          //     <AllProjectText
          //       onPress={() => {
          //         setProject("");
          //       }}
          //     >
          //       All
          //     </AllProjectText>
          //   </AllProject>
          // }
          renderItem={({ item }) => (
            //<SmallCircleCard title={item}></SmallCircleCard>
            <View>
              <Text>{item}</Text>
            </View>
          )}
        />
      ) : null}
      <ContentsList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          // <MiddleVCard
          //   createdAt={item.createdAt}
          //   nft={item.project.title}
          //   thumbnail={item.thumbnail}
          //   title={item.title}
          //   chain={item.chain}
          //   SNS={item.sns}
          //   fullData={item}
          // ></MiddleVCard>
          <SquareCard
            createdAt={item.createdAt}
            nft={item.project.title}
            thumbnail={item.thumbnail}
            title={item.title}
            chain={item.project.chain}
            SNS={item.sns}
            projectlogo={item.project.logoUrl}
            description={item.description}
            fullData={item}
          ></SquareCard>
        )}
      />
      <BottomFilter />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Watchlist;
