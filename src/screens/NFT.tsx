import { SafeAreaView } from "react-native";
import styled from "styled-components/native";
import { Dimensions, FlatList } from "react-native";
import NFTproject from "../components/card/NFTproject";
import { useQuery } from "@tanstack/react-query";
import { getAllProjects, getUser } from "../axios";
import { useEffect, useState } from "react";

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
`;
const ListHeaderText = styled.Text`
  font-size: 16px;
  font-family: "SpoqaHanSansNeo-Regular";
  font-weight: 700;
  color: ${(props) => props.theme.Text0dp};
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

  useEffect(() => {
    if (!isLoadingUser) {
      console.log(User.data);
    }
  }, []);

  //SETDATA
  const [allProjectData, setAllProjectData] = useState(null);

  useEffect(() => {
    if (!isLoadingProjectData) {
      setAllProjectData(ProjectData.data.projects);
    }
    // console.log(allProjectData);
  }, [isLoadingProjectData, ProjectData]);

  return (
    <SafeAreaView>
      <CollectionText>Projects</CollectionText>
      <FlatList
        ListHeaderComponent={
          <ListHeaderContainer>
            <ListHeaderText>Collection</ListHeaderText>
            <ListHeaderText>Floor Price</ListHeaderText>
            <ListHeaderText>Volumn</ListHeaderText>
          </ListHeaderContainer>
        }
        data={allProjectData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NFTproject
            fullData={item}
            chain={item.chain}
            title={item.title}
            logourl={item.logoUrl}
          />
        )}
      />
    </SafeAreaView>
  );
};
export default NFT;
