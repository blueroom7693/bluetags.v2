import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { Text, TouchableOpacity, View } from "react-native";
import BlueTag from "../Bluetag";

//CSS
const TotalContainer = styled.View`
  height: 280px;
  background-color: ${(props) => props.theme.Bg0dp};
  margin-bottom: 10px;
  margin-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
`;
const ProjectLogo = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  margin-right: 10px;
`;
const TopContainer = styled.View`
  background-color: ${(props) => props.theme.Bg0dp};
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;
  flex-direction: row;
`;
const Title = styled.Text`
  color: ${(props) => props.theme.Text0dp};
  font-weight: 700;
  font-size: 26px;
  font-family: "SpoqaHanSansNeo-Regular";
`;
const EventDate = styled.Text`
  color: ${(props) => props.theme.Text1dp};
  font-size: 12px;
  font-weight: 700;
  opacity: 0.5;
  margin-top: 15px;
  font-family: "SpoqaHanSansNeo-Regular";
`;
const Description = styled.Text`
  color: ${(props) => props.theme.Text0dp};
  font-size: 13px;
  font-weight: 400;
  margin-top: 15px;
  font-family: "SpoqaHanSansNeo-Regular";
  height: 70px;
`;
const BtnView = styled.TouchableOpacity`
  width: 295px;
  height: 40px;
  background: #191f28;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-top: 15px;
  flex-direction: row;
`;
const BtnText = styled.Text`
  font-family: "SpoqaHanSansNeo-Regular";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  color: ${(props) => props.theme.Bg0dp};
`;
//type
interface ICalendarCard {
  fullData: any;
}

//MAIN
const CalendarCard: React.FC<ICalendarCard> = ({ fullData }) => {
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
  return (
    <TotalContainer>
      <TopContainer>
        <ProjectLogo source={{ uri: fullData.project.logoUrl }}></ProjectLogo>
        <Title>{fullData.title.slice(0, 18)}...</Title>
      </TopContainer>
      <EventDate>
        {fullData.deadLineStart.slice(0, 10)} -{" "}
        {fullData.deadLineEnd.slice(0, 10)}
      </EventDate>
      {/* <Bluetags>{fullData.bluetags[0]}</Bluetags> */}
      <BlueTag
        color="rgba(0, 117, 255, 0.5)"
        isWhite="false"
        text="hello"
        bluetags={fullData.bluetags}
      ></BlueTag>
      <Description>{fullData.description.slice(0, 150)}</Description>
      <BtnView onPress={goToDetail}>
        <BtnText>go to detail</BtnText>
      </BtnView>
    </TotalContainer>
  );
};

export default CalendarCard;
