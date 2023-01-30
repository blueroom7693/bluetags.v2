import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { Text, TouchableOpacity, View } from "react-native";
import { AllNft } from "../../AllNft";
import { color } from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import { DataContext } from "../../context/DataProvider";
import { allSubscirbeProject, token } from "../../atom";
import { axiosInstance } from "../../axiosInstance";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";

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
`;
const ProjectLogo = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin-right: 10px;
`;
const ProjectName = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.Text0dp};
`;
const ProjectBy = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.Text1dp};
`;
const SubscribeBtn = styled.TouchableOpacity`
  justify-content: space-between;
`;

//MAIN
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
  // all subscribe
  const Allsubscribe = useRecoilValue(allSubscirbeProject);
  // console.log(Allsubscribe);

  // ISSUBSCRIBE?
  const userToken = useRecoilValue(token);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { user } = useContext(DataContext);

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
  const onRemove = (id) => {
    setSubscribeProject(subscribedProject.filter((user) => user !== id));
  };
  // Subscribe
  const [subscribedProject, setSubscribeProject] =
    useRecoilState(allSubscirbeProject);

  //querytitle
  const queryTitle = `${title
    .toLowerCase()
    .replace(/ /gi, "")
    .replace(/-/gi, "")
    .replace(/`/gi, "")}`;

  const onClickSubcribe = () => {
    try {
      axiosInstance.get(`/api/v1/user/favorite/choose/?nft=${queryTitle}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (subscribedProject.includes(`${queryTitle}`)) {
        onRemove(`${queryTitle}`);
      } else {
        setSubscribeProject([...subscribedProject, `${queryTitle}`]);
      }
    } catch {
      (error) => console.log(error);
    }
  };

  console.log(subscribedProject.includes(`${queryTitle}`));

  return subscribedProject ? (
    <TouchableOpacity onPress={goToDetail}>
      <Container>
        <View style={{ flexDirection: "row" }}>
          <ProjectLogo source={{ uri: logourl }}></ProjectLogo>
          <View>
            <ProjectName>{title}</ProjectName>
            <ProjectBy>by sangwan</ProjectBy>
          </View>
        </View>
        <SubscribeBtn
          onPress={() => {
            onClickSubcribe();
            setIsSubscribed((prev) => !prev);
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
