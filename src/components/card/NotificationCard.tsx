import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { View } from "react-native";

//CSS
const Title = styled.Text`
  color: ${(props) => props.theme.Text0dp};
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 20px;
`;
const ProjectTitle = styled.Text`
  color: ${(props) => props.theme.Text0dp};
  font-size: 12px;
  font-weight: 700;
`;
const DateText = styled.Text`
  color: ${(props) => props.theme.Text0dp};
  font-size: 12px;
  font-weight: 500;
`;
const ListContainer = styled.View`
  margin: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border-width: 1px;
  border-radius: 10px;
  border-color: rgba(25, 31, 40, 0.1);
  align-items: center;
`;
const Container = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.Bg0dp};
  align-items: flex-start;
  flex-direction: row;
  margin-bottom: 10px;
  /* justify-content: center; */
  padding-top: 30px;
  /* width: 316px; */
`;
const TextContainer = styled.View`
  margin-bottom: 20px;
  justify-content: center;
  width: 256px;
  height: 80px;
`;
const ProjectLogo = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
const Thumbnail = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 10px;
`;

//TYPE
interface ICircleProject {
  fullData: any;
  nft: string;
  chain: string;
  title: string;
  thumbnail: string;
  description: string;
  createdAt: string;
  SNS: string;
}

const NotificationCard: React.FC<ICircleProject> = ({ fullData }) => {
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
  //today

  return (
    <ListContainer>
      <Container>
        <ProjectLogo source={{ uri: fullData.projectLogo }}></ProjectLogo>
        <TextContainer>
          <Title>
            {fullData.projectTitle} uploads the post : {fullData.title}
          </Title>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 146,
            }}
          >
            <DateText>
              {(new Date().getTime() - new Date(fullData.createdAt).getTime()) /
                (1000 * 60 * 60 * 24) <
              1
                ? Math.floor(
                    (new Date().getTime() -
                      new Date(fullData.createdAt).getTime()) /
                      (1000 * 60 * 60)
                  ) <= 1
                  ? `${Math.floor(
                      (new Date().getTime() -
                        new Date(fullData.createdAt).getTime()) /
                        (1000 * 60 * 60)
                    )} hour ago`
                  : `${Math.floor(
                      (new Date().getTime() -
                        new Date(fullData.createdAt).getTime()) /
                        (1000 * 60 * 60)
                    )} hours ago`
                : Math.floor(
                    (new Date().getTime() -
                      new Date(fullData.createdAt).getTime()) /
                      (1000 * 60 * 60 * 24)
                  ) === 1
                ? `${Math.floor(
                    (new Date().getTime() -
                      new Date(fullData.createdAt).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )} day ago`
                : `${Math.floor(
                    (new Date().getTime() -
                      new Date(fullData.createdAt).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )} days ago`}
            </DateText>
          </View>
        </TextContainer>
        {fullData.thumbnail ? (
          <Thumbnail source={{ uri: fullData.thumbnail }}></Thumbnail>
        ) : (
          <Thumbnail
            source={require("../../assets/images/azukiWall.webp")}
          ></Thumbnail>
        )}
      </Container>
    </ListContainer>
  );
};

export default NotificationCard;
