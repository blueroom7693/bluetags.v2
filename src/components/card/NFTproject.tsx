import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { DataContext } from "../../context/DataProvider";
import { allSubscirbeProject, token, userData } from "../../atom";
import { axiosInstance } from "../../axiosInstance";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import useMutation from "../../libs/client/useMutation";

//TYPE
interface ISquareCard {
  fullData: any;
  nft: string;
  chain: string;
  title: string;
  thumbnail: string;
  description: string;
  createdAt: string;
  SNS: string;
}
//CSS
const Container = styled.View`
  background-color: ${(props) => props.theme.Bg0dp};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  border-width: 1px;
  border-color: rgba(220, 220, 220, 1);
  padding-left: 10px;
  padding-right: 10px;
`;
const ProjectLogo = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  margin-right: 10px;
`;
const ProjectName = styled.Text`
  font-size: 14px;
  font-family: "SpoqaHanSansNeo-Regular";
  font-weight: 700;
  color: ${(props) => props.theme.Text0dp};
`;
const ProjectPrice = styled.Text`
  font-size: 13px;
  font-family: "SpoqaHanSansNeo-Regular";
  font-weight: 700;
  color: ${(props) => props.theme.Text0dp};
`;
const SubscribeBtn = styled.TouchableOpacity`
  justify-content: space-between;
`;

//NFTproject
const NFTproject: React.FC<ISquareCard> = ({
  fullData,
  logourl,
  chain,
  title,
}) => {
  //NAV
  const navigation = useNavigation();
  const goToDetail = () => {
    //@ts-ignore
    navigation.navigate("Stack", {
      screen: "Detail",
      params: {
        ...fullData,
      },
    });
  };
  // 유저정보가져오기
  const user = useRecoilValue(userData);

  // Subscribe
  const [subscribedProject, setSubscribeProject] =
    useRecoilState(allSubscirbeProject);
  // 배열 삭제
  const onRemove = (id) => {
    setSubscribeProject(subscribedProject.filter((user) => user !== id));
  };

  //querytitle
  const queryTitle = `${title
    .toLowerCase()
    .replace(/ /gi, "")
    .replace(/-/gi, "")
    .replace(/`/gi, "")}`;

  //subscribe Post
  const [subscribe, { loading, error, status }] = useMutation(
    "https://www.bluetags.app/api/users/subscribe"
  );

  const onClickSubcribe = (projectId: string, projectTitle: string) => {
    if (!loading) {
      subscribe({
        projectId,
        id: user.id,
      });
      if (subscribedProject.includes(`${queryTitle}`)) {
        onRemove(`${queryTitle}`);
      } else {
        setSubscribeProject([...subscribedProject, `${queryTitle}`]);
      }
    }
  };

  return user ? (
    <TouchableOpacity onPress={goToDetail}>
      <Container>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: 260,
          }}
        >
          <ProjectLogo source={{ uri: logourl }}></ProjectLogo>
          <ProjectName>{title}</ProjectName>
        </View>
        <ProjectPrice>2.5 {fullData.chain}</ProjectPrice>
        <SubscribeBtn
          onPress={() => {
            onClickSubcribe(fullData.id, fullData.title);
          }}
        >
          {subscribedProject.includes(`${queryTitle}`) ? (
            <AntDesign name="star" size={24} color="black" />
          ) : (
            <AntDesign name="staro" size={24} color="black" />
          )}
        </SubscribeBtn>
      </Container>
    </TouchableOpacity>
  ) : null;
};

export default NFTproject;
