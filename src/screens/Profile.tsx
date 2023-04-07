import styled, { ThemeContext } from "styled-components/native";
import React, { useEffect, useRef, useState } from "react";
import { Text, StyleSheet, SafeAreaView, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBackward,
  faCircleDollar,
  faClockRotateLeft,
  faDownToBracket,
} from "@fortawesome/pro-regular-svg-icons";
import {
  faGear,
  faRightFromBracket,
  faSquareUser,
} from "@fortawesome/pro-light-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { useRecoilState } from "recoil";
import { isLogined } from "../atom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import useMutation from "../libs/client/useMutation";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import Loader from "../utils/loader";
import { useInfiniteQuery } from "@tanstack/react-query";
import SmallHCard from "../components/card/SmallHCard";
import UpperSVG from "../assets/images/misc/upper.svg";

const Container = styled.FlatList`
  flex: 1;
  background-color: ${(props) => props.theme.Bg0dp};
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
`;

const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
  border-width: 1px;
  border-color: rgba(25, 31, 40, 0.1);
  border-radius: 4px;
  background-color: rgba(25, 31, 40, 0.05);
  height: 120px;
  margin-top: 30px;
`;

const OptionContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 20px;
  margin-bottom: -10px;
  margin-top: -10px;
`;

const ProfileImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 100px;
  /* margin-right: 10px; */
`;

const Name = styled.Text`
  font-size: 12px;
  font-weight: 400;
  color: ${(props) => props.theme.Text0dp};
  font-family: "SpoqaHanSansNeo-Regular";
`;
const OptionName = styled.Text`
  color: ${(props) => props.theme.Text0dp};
  font-size: 16px;
  margin-left: 20px;
`;

const ServiceTerms = styled.Text`
  color: ${(props) => props.theme.Text1dp};
  font-size: 14px;
  margin-top: 250px;
`;

const SmallContainer = styled.View`
  align-items: center;
  margin-left: 15px;
`;
const Number = styled.Text`
  font-size: 13px;
  font-weight: 700;
  color: ${(props) => props.theme.Text0dp};
  font-family: "SpoqaHanSansNeo-Regular";
  margin-bottom: 5px;
`;
const Title = styled.Text`
  font-size: 26px;
  font-weight: 300;
  color: ${(props) => props.theme.Text0dp};
  font-family: "SpoqaHanSansNeo-Regular";
  margin-bottom: 5px;
`;
const SubTitle = styled.Text`
  color: ${(props) => props.theme.Text0dp};
  margin-bottom: 5px;
  font-family: "SpoqaHanSansNeo-Regular";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  opacity: 0.5;
`;
const TitleContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
`;
const UpperBtn = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  position: absolute;
  border-radius: 40px;
  background-color: white;
  justify-content: center;
  align-items: center;
  bottom: 20px;
  right: 20px;
`;

const Profile = () => {
  const theme = useContext(ThemeContext);
  //유저정보 업데이트
  const [user, setUser] = useState();
  const isfoucsed = useIsFocused();
  useEffect(() => {
    if (isfoucsed) {
      axios.get("https://www.bluetags.app/api/users").then((res) => {
        setUser(res.data.id);
      });
    }
    console.log("와치리스트 페이지 들어옴");
  }, [isfoucsed]);
  //LOGOUT
  const [isLogin, setIsLogin] = useRecoilState(isLogined);
  const [
    logOut,
    { data: logoutData, loading: logoutLoading, status: logoutStatus },
  ] = useMutation("https://www.bluetags.app/api/users/sign-out");

  function logoutFun() {
    logOut({}).then(() => {
      axios.get("https://www.bluetags.app/api/users").then((res) => {
        if (res.data) {
          console.log("still logined");
        } else {
          console.log("logout success");
          setIsLogin(null);
        }
      });
    });
  }
  console.log(user);
  //LOGOUT - Async
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("sangwan");
      setIsLogin(false);
    } catch (e) {}
  };
  // 프로필 페이지 읽은 블루카드
  const {
    isLoading: isLoadingHistoryBluecards,
    data: HistoryBluecards,
    // refetch: searchBluecards,
    fetchNextPage,
  } = useInfiniteQuery(
    ["HistoryBluecards", user],
    async ({ pageParam }) => {
      if (user) {
        const previous = pageParam || "undefined";
        const { data } = await axios.get(
          `https://www.bluetags.app//api/bluecards?user=${user}&read=true&previous=${previous}`
        );
        return data;
      }
      // } else {
      //   const previous = pageParam || "undefined";
      //   const { data } = await axios.get(
      //     `https://www.bluetags.app//api/bluecards?user=${user}&read=true&previous=${previous}`
      //   );
      //   return data;
      // }
    },
    {
      getNextPageParam: (currentPage) => {
        const nextPageId =
          currentPage?.bluecards[currentPage.bluecards.length - 1]?.id;
        return nextPageId || undefined;
      },
      // enabled: false,
    }
  );

  const loadMore = () => {
    if (
      HistoryBluecards &&
      HistoryBluecards.pages[HistoryBluecards.pages.length - 1].bluecards
        .length === 10
    ) {
      fetchNextPage();
    }
  };
  const flatListRef = useRef(null);

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  ///historydata

  return !user || !HistoryBluecards ? (
    <Loader></Loader>
  ) : (
    <SafeAreaView style={styles.container}>
      <Container
        ListHeaderComponent={
          <>
            <View>
              <ProfileContainer>
                <ProfileImage
                  source={{
                    uri: "https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000",
                  }}
                />
                <SmallContainer>
                  <Number>50</Number>
                  <Name>NFT owned</Name>
                </SmallContainer>
                <SmallContainer>
                  <Number>23</Number>
                  <Name>Subscribe</Name>
                </SmallContainer>
                <SmallContainer>
                  <Number>$18.1K</Number>
                  <Name>Subscribe</Name>
                </SmallContainer>
              </ProfileContainer>
              <TitleContainer>
                <Title>History</Title>
                <SubTitle>Large</SubTitle>
              </TitleContainer>
            </View>
          </>
        }
        data={HistoryBluecards?.pages.map((page) => page.bluecards).flat()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SmallHCard fullData={item}></SmallHCard>}
        onEndReached={loadMore}
        ref={flatListRef}
      ></Container>
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

export default Profile;

{
  /* <OptionContainer>
<FontAwesomeIcon
  icon={faSquareUser}
  color={theme.Text0dp}
  size={24}
/>
<OptionName>내 채널</OptionName>
</OptionContainer>
<OptionContainer>
<FontAwesomeIcon
  icon={faDownToBracket}
  color={theme.Text0dp}
  size={24}
/>
<OptionName>오프라인 저장 콘텐츠</OptionName>
</OptionContainer>
<OptionContainer>
<FontAwesomeIcon
  icon={faClockRotateLeft}
  color={theme.Text0dp}
  size={24}
/>
<OptionName>기록</OptionName>
</OptionContainer>
<OptionContainer>
<FontAwesomeIcon icon={faBackward} color={theme.Text0dp} size={24} />
<OptionName>내 Recap</OptionName>
</OptionContainer>
<OptionContainer>
<FontAwesomeIcon
  icon={faCircleDollar}
  color={theme.Text0dp}
  size={24}
/>
<OptionName>유료 멤버십</OptionName>
</OptionContainer>
<OptionContainer>
<FontAwesomeIcon icon={faGear} color={theme.Text0dp} size={24} />
<OptionName>설정</OptionName>
</OptionContainer>
<OptionContainer>
<FontAwesomeIcon
  icon={faCircleQuestion}
  color={theme.Text0dp}
  size={24}
/>
<OptionName>고객센터</OptionName>
</OptionContainer>
<OptionContainer onPress={logoutFun}>
<FontAwesomeIcon
  icon={faRightFromBracket}
  color={theme.Text0dp}
  size={24}
/>
<OptionName>로그아웃</OptionName>
</OptionContainer>
<ServiceTerms>개인정보처리방침 및 서비스약관</ServiceTerms> */
}
