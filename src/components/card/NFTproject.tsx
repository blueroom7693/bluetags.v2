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
`;
const ProjectLogo = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  margin-right: 10px;
`;
const ProjectName = styled.Text`
  font-size: 16px;
  font-family: "SpoqaHanSansNeo-Regular";
  font-weight: 700;
  color: ${(props) => props.theme.Text0dp};
`;
const ProjectPrice = styled.Text`
  font-size: 16px;
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
  // const { user } = useContext(DataContext);
  const { user } = useRecoilValue(userData);
  console.log("user");
  console.log(userData);

  // all subscribe
  const Allsubscribe = useRecoilValue(allSubscirbeProject);
  console.log(Allsubscribe);

  //구독 된건지 아닌지 하나씩 확인
  const [isSubscribed, setIsSubscribed] = useState(false);
  useEffect(() => {
    if (user) {
      if (
        user.subscribe.includes(
          title
            .toLowerCase()
            .replace(/ /gi, "")
            .replace(/-/gi, "")
            .replace(/`/gi, "")
        )
      ) {
        setIsSubscribed(true);
      }
    }
  }, []);
  // 배열 삭제
  // const onRemove = (id) => {
  //   setSubscribeProject(subscribedProject.filter((user) => user !== id));
  // };
  // Subscribe
  const [subscribedProject, setSubscribeProject] =
    useRecoilState(allSubscirbeProject);

  //querytitle
  const queryTitle = `${title
    .toLowerCase()
    .replace(/ /gi, "")
    .replace(/-/gi, "")
    .replace(/`/gi, "")}`;

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

  //old version
  // const onClickSubcribe = () => {
  //   try {
  //     axiosInstance.get(`/api/v1/user/favorite/choose/?nft=${queryTitle}`, {
  //       headers: {
  //         Authorization: `Bearer ${userToken}`,
  //       },
  //     });
  //     if (subscribedProject.includes(`${queryTitle}`)) {
  //       onRemove(`${queryTitle}`);
  //     } else {
  //       setSubscribeProject([...subscribedProject, `${queryTitle}`]);
  //     }
  //   } catch {
  //     (error) => console.log(error);
  //   }
  // };

  return subscribedProject ? (
    <TouchableOpacity onPress={goToDetail}>
      <Container>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <ProjectLogo source={{ uri: logourl }}></ProjectLogo>
          <View>
            <ProjectName>{title}</ProjectName>
          </View>
          <ProjectPrice>2.5 {fullData.chain}</ProjectPrice>
        </View>
        <SubscribeBtn
          onPress={() => {
            onClickSubcribe(fullData.id, fullData.title);
          }}
        >
          {/* <SubscribeBtn onPress={onClick}> */}
          {/* {isSubscribed ? ( */}
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
