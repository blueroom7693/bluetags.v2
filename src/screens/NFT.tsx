import { SafeAreaView, View } from "react-native";
import styled from "styled-components/native";
import { Dimensions, FlatList } from "react-native";
import NFTproject from "../components/card/NFTproject";
import { useQuery } from "@tanstack/react-query";
import { getAllProjects, getUser } from "../axios";
import { useEffect, useState } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

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

const CollectionText = styled.Text`
  font-size: 22px;
  font-weight: 400;
  color: ${(props) => props.theme.Text0dp};
  margin-left: 20px;
`;

const ListHeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.Bg0dp};
  flex-direction: row;
  height: 60px;
  border-width: 1px;
  border-color: rgba(220, 220, 220, 1);
  padding-left: 10px;
  padding-right: 10px;
`;
const ListHeaderText = styled.Text`
  font-size: 16px;
  font-family: "SpoqaHanSansNeo-Regular";
  font-weight: 700;
  color: ${(props) => props.theme.Text0dp};
`;

const ProjectList = styled.FlatList`
  margin-left: 15px;
  margin-right: 15px;
`;

const NFT = () => {
  //query
  const { isLoading: isLoadingProjectData, data: ProjectData } = useQuery(
    ["subscribeInfo"],
    getAllProjects
  );
  const { isLoading: isLoadingUser, data: User } = useQuery(
    ["userData"],
    getUser
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

  useEffect(() => {
    if (!isLoadingUser) {
      console.log(User.data.subscribe);
    }
  }, []);

  //SETDATA
  const [allProjectData, setAllProjectData] = useState(null);

  useEffect(() => {
    if (!isLoadingProjectData) {
      setAllProjectData(ProjectData.data.projects);
      console.log(ProjectData.data.projects);
    }
    // console.log(allProjectData);
  }, [isLoadingProjectData, ProjectData]);
  useEffect(() => {
    console.log(User);
  }, [User]);
  return (
    <SafeAreaView>
      {isLoadingUser ? null : (
        <ProjectList
          ListHeaderComponent={
            <View>
              <HeaderView>
                <HeaderTitle>Trending News</HeaderTitle>
                <SubHeaderTitle>Sub Event</SubHeaderTitle>
              </HeaderView>
              <ListHeaderContainer>
                <ListHeaderText>Collection</ListHeaderText>
                <ListHeaderText>Floor Price</ListHeaderText>
                <ListHeaderText>Volumn</ListHeaderText>
              </ListHeaderContainer>
            </View>
          }
          data={allProjectData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NFTproject
              fullData={item}
              chain={item.chain}
              title={item.title}
              logourl={item.logoUrl}
              isBool={User?.data.subscribe.includes(item.key)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};
export default NFT;
