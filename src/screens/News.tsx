import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";

//css
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

const NewsPage = () => {
  //유저정보 업데이트
  const isfoucsed = useIsFocused();
  useEffect(() => {
    if (isfoucsed) {
      axios.get("https://www.bluetags.app/api/users").then((res) => {
        // setSubscribeProject(res.data.subscribe);
        // setUser(res.data.id);
        axios
          .get(`https://www.bluetags.app/api/bluecards?user=${res.data.id}`)
          .then((respose) => {
            // setNftData(Object.values(respose.data.bluecards)[2]);
            // setIsLoadingNft(false);
          });
      });
    }
    console.log("와치리스트 페이지 들어옴");
  }, [isfoucsed]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderView>
        <HeaderTitle>Trending News</HeaderTitle>
        <SubHeaderTitle>Sub Event</SubHeaderTitle>
      </HeaderView>
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

export default NewsPage;
