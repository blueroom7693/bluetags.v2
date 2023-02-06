import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { Text, TouchableOpacity, View } from "react-native";

//CSS
const TotalContainer = styled.TouchableOpacity`
  height: 270px;
  background-color: ${(props) => props.theme.Bg0dp};
  margin-bottom: 10px;
  margin-top: 10px;
`;
const ProjectLogo = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 10px;
`;
const TopContainer = styled.View`
  background-color: ${(props) => props.theme.Bg0dp};
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
  flex-direction: row;
`;
const Title = styled.Text`
  color: ${(props) => props.theme.Text0dp};
  font-weight: 400;
  font-size: 19px;
  font-family: "SpoqaHanSansNeo-Regular";
`;
const Follower = styled.Text`
  color: ${(props) => props.theme.Text1dp};
  font-size: 12px;
`;
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
    <TotalContainer onPress={goToDetail}>
      <TopContainer>
        <View>
          <Title>{fullData.title}</Title>
          <Follower>
            {fullData.deadLineStart.slice(0, 10)} -{" "}
            {fullData.deadLineEnd.slice(0, 10)}
          </Follower>
          <Follower>{fullData.bluetags}</Follower>
        </View>
        <ProjectLogo source={{ uri: fullData.project.logoUrl }}></ProjectLogo>
      </TopContainer>
    </TotalContainer>
  );
};

export default CalendarCard;
