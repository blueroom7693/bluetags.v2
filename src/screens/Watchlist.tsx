import { useEffect, useRef, useState } from "react";
import {
  useColorScheme,
  SafeAreaView,
  StyleSheet,
  Animated,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import BottomFilter from "../components/bottomsheet/BottomFilter";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  allSubscirbeProject,
  chainString,
  isBottomFilter,
  pastString,
  projectString,
  snstString,
  todayString,
  token,
} from "../atom";
import SmallCircleCard from "../components/card/SmallCircleCard";
import { useIsFocused } from "@react-navigation/native";
import BluecardLarge from "../components/card/BluecardLarge";
import LogoBlueSVG from "../assets/images/misc/LogoBlue.svg";
import CustomScrollHeader from "../components/custom/CustomScrollHeader";
import Loader from "../utils/loader";
import UpperSVG from "../assets/images/misc/upper.svg";
import { useInfiniteQuery } from "@tanstack/react-query";

//CSS
const ContentsList = styled.FlatList`
  background-color: ${(props) => props.theme.Bg0dp};
  /* width: 100%; */
`;

const ProjectScroller = styled.FlatList`
  background-color: ${(props) => props.theme.Bg0dp};
  border-color: ${(props) => props.theme.BgBorder};
  height: 80px;
  margin-top: 20px;
`;
const HListSeparator = styled.View`
  width: 15px;
  background-color: ${(props) => props.theme.Bg0dp};
`;

const HeaderView = styled.View``;

const HeaderTitle = styled.Text`
  font-size: 26px;
  color: ${(props) => props.theme.Text1dp};
  margin-left: 15px;
  margin-bottom: 3px;
  margin-top: 35px;
  font-family: "SpoqaHanSansNeo-Regular";
`;
const SubHeaderTitle = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.Text0dp};
  margin-left: 15px;
  font-weight: 700;
  opacity: 0.5;
  margin-bottom: 16px;
  font-family: "SpoqaHanSansNeo-Regular";
`;

const BluetagsBtn = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  position: absolute;
  border-radius: 8px;
  background-color: white;
  justify-content: center;
  align-items: center;
  bottom: 60px;
  right: 50px;
  /* border-width: 1px; */
`;
const UpperBtn = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  position: absolute;
  border-radius: 40px;
  background-color: white;
  justify-content: center;
  align-items: center;
  bottom: 60px;
  right: 0px;
`;

const Watchlist = ({ navigation, router }) => {
  //THEME
  const isDark = useColorScheme() === "dark";
  // 유저정보
  const [user, setUser] = useState<string>();
  // 구독프로젝트 리스트
  const [subscribeProject, setSubscribeProject] = useState<string[]>();
  // 구독리스트 기반 블루카드 받아오기!
  const [NftData, setNftData] = useState();
  const [isLoadingNft, setIsLoadingNft] = useState(true);
  //유저정보 업데이트
  const isfoucsed = useIsFocused();
  useEffect(() => {
    if (isfoucsed) {
      axios.get("https://www.bluetags.app/api/users").then((res) => {
        setSubscribeProject(res.data.subscribe);
        setUser(res.data.id);
        axios
          .get(
            `https://www.bluetags.app/api/bluecards?watchlist=true&user=${res.data.id}&previous=undefined`
          )
          .then((respose) => {
            setNftData(Object.values(respose.data.bluecards));
            setIsLoadingNft(false);
          });
      });
    }
    console.log("와치리스트 페이지 들어옴");
  }, [isfoucsed]);

  //데이터 API 주소 메이커
  // 와치리스트 블루카드
  const [projectSelected, setProject] = useRecoilState(projectString);

  const {
    isLoading: isLoadingWatchlistBluecards,
    data: watchlistBluecards,
    refetch: searchBluecards,
    fetchNextPage,
  } = useInfiniteQuery(
    ["WatchlistBluecards", projectSelected, user],
    async ({ pageParam }) => {
      if (projectSelected) {
        const previous = pageParam || "undefined";
        const { data } = await axios.get(
          `https://www.bluetags.app//api/bluecards?watchlist=true&project=${projectSelected}&previous=${previous}`
        );
        return data;
      } else {
        const previous = pageParam || "undefined";
        const { data } = await axios.get(
          `https://www.bluetags.app//api/bluecards?watchlist=true&user=${user}&previous=${previous}`
        );
        return data;
      }
    },
    {
      getNextPageParam: (currentPage) => {
        const nextPageId =
          currentPage.bluecards[currentPage.bluecards.length - 1]?.id;
        return nextPageId || undefined;
      },
      // enabled: false,
    }
  );

  const loadMore = () => {
    if (
      watchlistBluecards &&
      watchlistBluecards.pages[watchlistBluecards.pages.length - 1].bluecards
        .length === 10
    ) {
      fetchNextPage();
    }
  };

  /////////////////////////////////////////////

  //바텀시트
  const [isOpen, setIsOpen] = useRecoilState(isBottomFilter);

  //Flatlist UPPER
  const scrollY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  //RETURN
  return isLoadingNft ? (
    <Loader />
  ) : (
    <SafeAreaView style={styles.container}>
      {/* <HeaderScroller /> */}
      <View>
        {subscribeProject ? (
          <CustomScrollHeader animatedValue={scrollY}>
            <ProjectScroller
              data={subscribeProject}
              keyExtractor={(item) => item}
              horizontal={true}
              ItemSeparatorComponent={HListSeparator}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 15 }}
              renderItem={({ item }) => (
                <SmallCircleCard title={item}></SmallCircleCard>
              )}
            />
          </CustomScrollHeader>
        ) : null}
        <ContentsList
          //headrscroller
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          ref={flatListRef}
          contentContainerStyle={{ paddingTop: 100 }}
          showsVerticalScrollIndicator={false}
          // data={NftData}
          data={watchlistBluecards?.pages.map((page) => page.bluecards).flat()}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <HeaderView>
              <HeaderTitle>Main title</HeaderTitle>
              <SubHeaderTitle>Sub Event</SubHeaderTitle>
            </HeaderView>
          }
          renderItem={({ item }) => (
            <BluecardLarge fullData={item}></BluecardLarge>
          )}
          onEndReached={loadMore}
        />
        <BluetagsBtn
          onPress={() => setIsOpen(true)}
          style={{
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 4 },
            // shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <LogoBlueSVG height={25} width={25} />
        </BluetagsBtn>
        <UpperBtn
          style={{
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 4 },
            // shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
          onPress={scrollToTop}
        >
          <UpperSVG height={20} width={20} fill={"#1c1b1b"} />
        </UpperBtn>
      </View>
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "grey",
    position: "absolute",
    zIndex: 1,
  },
  button: {
    position: "absolute",
    bottom: 60,
    right: 80,
    // backgroundColor: "#007AFF",
    backgroundColor: "white",

    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 30,
    height: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Watchlist;
