import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import MiddleBarSVG from "../../assets/images/misc/middlebar.svg";
import { View } from "react-native";
import SubscribeSVG from "../../assets/images/misc/subscribeWhite.svg";

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
const Date = styled.Text`
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
  width: 80px;
  height: 80px;
  border-radius: 10px;
`;
const BlueTags = styled.Text`
  color: ${(props) => props.theme.Text0dp};
  font-size: 14px;
`;
const Description = styled.Text`
  color: ${(props) => props.theme.Text0dp};
  font-size: 12px;
  font-weight: 500;
`;
const SubscribeContainer = styled.View`
  width: 336px;
  height: 40px;
  background-color: #191f28;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-bottom: 20px;
  margin-top: 10px;
`;
const Subscribe = styled.Text`
  font-weight: 700;
  font-size: 12px;
  color: ${(props) => props.theme.BtnInner};
`;

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
  return (
    <ListContainer>
      <Container>
        <TextContainer>
          <Title>{fullData.title}</Title>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 146,
            }}
          >
            <ProjectTitle>{fullData.projectkey}</ProjectTitle>
            <MiddleBarSVG width={11} />
            <Date>22.09.24</Date>
          </View>
        </TextContainer>
        {fullData.thumbnail ? (
          <ProjectLogo source={{ uri: fullData.thumbnail }}></ProjectLogo>
        ) : (
          <ProjectLogo
            source={require("../../assets/images/azukiWall.webp")}
          ></ProjectLogo>
        )}
      </Container>
      <View style={{ height: 51 }}>
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi egestas
          velit eget lacus finibus lobortis. Integer felis turpis, dapibus a mi
          ut, placerat tincidunt dolor. Suspendisse dui nibh, placerat at
          elementum vel, malesuada in urna. Cras ante lectus, cursus quis dui
          eget, scelerisque porta orci.
        </Description>
      </View>
      {/* <Description>{fullData.description}</Description> */}
      <BlueTags>#SAMPLE #SAMPLE</BlueTags>
      <SubscribeContainer>
        <Subscribe>Subscribe</Subscribe>
        <SubscribeSVG />
      </SubscribeContainer>
    </ListContainer>
  );
};

export default NotificationCard;
