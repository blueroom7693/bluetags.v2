import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AllNft } from "../../AllNft";
import MiddleBarSVG from "../../assets/images/misc/middlebar.svg";
import BtnSVG from "../../assets/images/misc/subscribeWhite.svg";

//CSS
const Container = styled.View`
  background-color: ${(props) => props.theme.Bg0dp};
  width: 355px;
  height: 516px;
  margin-top: 20px;
  align-items: flex-start;
  border-radius: 10px;
  margin-bottom: 20px;
  margin: 10px;
  /* justify-content: center; */
  /* border: 1px solid rgba(0, 0, 0, 0.1); */
  /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); */
`;
const MainContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0px 24px 24px;
  gap: 16px;

  width: 350px;
  height: 200px;
`;

const TitleConatainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 0px 0px;

  width: 315px;
  height: 40px;
  margin-top: 30px;
  justify-content: space-between;
  margin-bottom: 20px;
  /* border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-style: solid; */
`;

const TimeContaier = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 10px;
  /* border-bottom-width: 1px; */
  border-color: rgba(0, 0, 0, 0.1);
`;

const Thumbnail = styled.Image`
  width: 355px;
  height: 210px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const ProjectLogo = styled.Image`
  width: 17px;
  height: 17px;
  border-radius: 2px;
`;
const SnsLogo = styled.Image`
  width: 30px;
  height: 30px;
  /* margin-left: 10px; */
  border-radius: 0px;
`;
const CreatedAt = styled.Text`
  font-size: 12px;
  margin-left: 10px;
  color: ${(props) => props.theme.Text0dp};
  font-family: "SpoqaHanSansNeo-Regular";
  font-weight: 500;
`;
const Description = styled.Text`
  font-size: 13px;
  font-weight: 400;
  line-height: 14px;
  color: ${(props) => props.theme.Text0dp};
  font-family: "SpoqaHanSansNeo-Regular";
  margin-top: 20px;
`;
const BlueTags = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.Text0dp};
  font-family: "SpoqaHanSansNeo-Regular";
`;
const ArticleTitle = styled.Text`
  font-size: 26px;
  font-weight: 500;
  color: ${(props) => props.theme.Text0dp};
  padding-left: 15px;
  font-family: "SpoqaHanSansNeo-Regular";
`;
const ProjectTitle = styled.Text`
  font-size: 12px;
  font-weight: 700;
  font-family: "SpoqaHanSansNeo-Regular";
  color: ${(props) => props.theme.Text0dp};
  margin-right: 10px;
`;
const BtnView = styled.TouchableOpacity`
  width: 295px;
  height: 40px;
  background: #191f28;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-top: 30px;
  flex-direction: row;
`;
const BtnText = styled.Text`
  font-family: "SpoqaHanSansNeo-Regular";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  color: ${(props) => props.theme.Bg0dp};
`;

//TYPE
interface ISquareCard {
  fullData: any;
}

//MAIN
const BluecardLarge: React.FC<ISquareCard> = ({ fullData }) => {
  //NAV
  const navigation = useNavigation();
  const goToDetail = () => {
    //@ts-ignore
    navigation.navigate("Stack", {
      screen: "DetailArticle",
      params: {
        ...fullData,
      },
    });
  };
  //ALLDATA
  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <Container
        style={{
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 4 },
          // shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        {fullData.thumbnail ? (
          <Thumbnail source={{ uri: fullData.thumbnail }}></Thumbnail>
        ) : (
          <Thumbnail
            source={{
              uri: fullData.project.logoUrl,
            }}
          ></Thumbnail>
        )}
        {/* <Thumbnail source={{ uri: thumbnail }}></Thumbnail> */}
        <MainContainer>
          <TitleConatainer>
            <View style={{ width: 250 }}>
              <ArticleTitle>
                {fullData.title.slice(0, 15)}
                {fullData.title.length > 45 ? "..." : null}
              </ArticleTitle>
            </View>
            {fullData.sns === "discord" ? (
              <SnsLogo
                source={{
                  uri: "https://www.freepnglogos.com/uploads/discord-logo-png/discord-logo-vector-download-0.png",
                }}
              ></SnsLogo>
            ) : (
              <SnsLogo
                source={{
                  uri: "https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png",
                }}
              ></SnsLogo>
            )}
          </TitleConatainer>
          <TimeContaier>
            <View
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 5,
                elevation: 10,
                justifyContent: "center",
                alignItems: "center",
                width: 17,
                height: 17,
                marginRight: 10,
              }}
            >
              <ProjectLogo
                source={{ uri: fullData.project.logoUrl }}
              ></ProjectLogo>
            </View>
            <ProjectTitle>{fullData.project.title}</ProjectTitle>
            <MiddleBarSVG width={11} />
            <CreatedAt>{`${new Date(
              fullData.createdAt
            ).toDateString()}`}</CreatedAt>
          </TimeContaier>
          <Description>
            {fullData.description.slice(0, 180)}
            {fullData.description.length > 45 ? "..." : null}
          </Description>
          <BtnView>
            <BtnText>Subscribe</BtnText>
            <BtnSVG width={40} />
          </BtnView>
        </MainContainer>
        {/* <BlueTags>#SAMPLE</BlueTags> */}
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default BluecardLarge;
