import { RefreshControl, SafeAreaView, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { getAllBluecards, getUser, UpdateUser } from "../axios";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  allSubscirbeProject,
  chainString,
  isBottomDetail,
  isBottomFilter,
  isLogined,
  pastString,
  projectString,
  snstString,
  subscirbeProject,
  todayString,
  userData,
} from "../atom";
import BottomFilter from "../components/bottomsheet/BottomFilter";
import SquareCard from "../components/card/SquareCard";
import { AllNftNonChain } from "../AllNft";
import { DataContext } from "../context/DataProvider";
import axios from "axios";
import NFTlist from "../components/card/NFTlist";
import Loader from "../components/Loader";

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
export default function Home() {
  //USERDATA
  const { user } = useContext(DataContext);
  //ProjectData
  const [projectData, setProjectData] = useState(null);
  const [newProjectData, setNewProjectData] = useState(null);

  //AllNftNonChain
  const AllNft = Object.values(AllNftNonChain);
  //BOTTOM FILTER
  const [bottomFilter, setBottomFilter] = useRecoilState(isBottomFilter);
  const openFilter = () => {
    setBottomFilter(true);
  };
  //BOTTOM DETAIL
  const [bottomDetail, setBottomDetail] = useRecoilState(isBottomDetail);
  const openDetail = () => {
    setBottomDetail(true);
  };
  //query
  const { isLoading: isLoadingNft, data: NftData } = useQuery<IInfo>(
    ["homeInfo"],
    getAllBluecards
  );
  //recoil value
  const chain = useRecoilValue(chainString);
  const project = useRecoilValue(projectString);
  const sns = useRecoilValue(snstString);
  const today = useRecoilValue(todayString);
  const past = useRecoilValue(pastString);
  const subscribe = useRecoilValue(subscirbeProject);
  //filter
  const filter = (info: IData) => {
    let chainBool: boolean = true;
    let projectBool: boolean = true;
    let snsBool: boolean = true;
    let dateBool: boolean = true;
    const date = new Date(Date.parse(info.createdAt)).getTime();
    if (chain !== "") {
      chainBool = info.chain === chain.toUpperCase();
    }

    if (sns !== "") {
      snsBool = info.SNS === sns;
    }
    if (today.getTime() - date < 0 || date - past.getTime() < 0) {
      dateBool = false;
    }

    return chainBool && snsBool && dateBool;
  };
  //SETDATA
  const [data, setData] = useState<IData[]>();

  useEffect(() => {
    if (!isLoadingNft) {
      setData(Object.values(NftData.data.bluecards));
    }
  }, [isLoadingNft, NftData]);

  //usercheck
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

  // useEffect(() => {
  //   if (!isLoadingNft) {
  //     setData(Object.values(NftData?.data).filter(filter));
  //   }
  // }, [chain, project, sns, today, past, subscribe, NftData]);
  ////refresh
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  //RETURN

  return isLoadingNft ? null : (
    <SafeAreaView style={styles.container}>
      <HomeContainer
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
          renderItem={({ item }) => (
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
        {/* RECOMMEDED PROJECT FLATLIST */}
        <SubHeaderTitle>Project</SubHeaderTitle>
        <HeaderTitle>Large</HeaderTitle>
        {/* <NFTList
          data={AllNft}
          keyExtractor={(item) => item.title}
          horizontal={true}
          ItemSeparatorComponent={HListSeparator}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          // numColumns="3"
          renderItem={({ item }) => (
            <CircleCard
              fullData={item}
              chain={item.chain}
              title={item.title}
              logo={item.logourl}
            ></CircleCard>
          )}
        /> */}
        <NFTList
          data={newProjectData}
          keyExtractor={(item) => item[0].id}
          horizontal={true}
          ItemSeparatorComponent={HListSeparator}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          // numColumns="3"
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
        {/* <NFTList
          data={data}
          keyExtractor={(item) => item._id}
          horizontal={true}
          ItemSeparatorComponent={HListSeparator}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          renderItem={({ item }) => (
            <SquareCard
              // _id={item._id}
              createdAt={item.createdAt}
              nft={item.nft}
              thumbnail={item.thumbnail}
              title={item.title}
              chain={item.chain}
              SNS={item.SNS}
              fullData={item}
            ></SquareCard>
          )}
        /> */}
      </HomeContainer>
      <BottomFilter />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 50,
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
