import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { allSubscirbeProject, token, userData } from "../../atom";
import { useRecoilState, useRecoilValue } from "recoil";
import useMutation from "../../libs/client/useMutation";

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

interface ISquareCard {
  fullData: any;
  nft: string;
  chain: string;
  title: string;
  thumbnail: string;
  description: string;
  createdAt: string;
  SNS: string;
  logourl: string;
  isBool?: boolean;
}

//NFTproject
const NFTproject: React.FC<ISquareCard> = ({
  fullData,
  logourl,
  chain,
  title,
  isBool = false,
}) => {
  const [isSubscribed, setIsSubscribed] = useState(isBool);
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
      setIsSubscribed((prev) => !prev);
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
          <ProjectLogo source={{ uri: fullData.logoUrl }}></ProjectLogo>
          <ProjectName>{fullData.title}</ProjectName>
        </View>
        <ProjectPrice>2.5 {fullData.chain}</ProjectPrice>
        <SubscribeBtn
          onPress={() => {
            onClickSubcribe(fullData.id, fullData.title);
          }}
        >
          {isSubscribed ? (
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
