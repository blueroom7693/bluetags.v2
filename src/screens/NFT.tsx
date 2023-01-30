import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import styled from "styled-components/native";
import { Dimensions, FlatList } from "react-native";
import Swiper from "react-native-swiper";
import icons from "../../icons";
import { WHITE } from "../colors";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { isLogined } from "../atom";
import { useRecoilState } from "recoil";
import { AllNft, AllNftNonChain } from "../AllNft";
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
        // data={Object.values(allProjectData)}
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
