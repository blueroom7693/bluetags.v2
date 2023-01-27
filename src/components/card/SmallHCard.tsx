import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import MiddleBarSVG from "../../assets/images/misc/middlebar.svg";
import { View } from "react-native";

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
  font-size: 19px;
  font-weight: 400;
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
`;
const Container = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.Bg0dp};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex: 1;
  padding-left: 50px;
  padding-right: 50px;
  margin-bottom: 10px;
`;
const TextContainer = styled.View`
  width: 100%;
`;
const ProjectLogo = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 10px;
`;
const BlueTags = styled.Text`
  color: ${(props) => props.theme.Text1dp};
  font-size: 14px;
`;

const SmallHCard: React.FC<ICircleProject> = ({
  fullData,
  nft,
  chain,
  title,
  thumbnail,
  description,
  createdAt,
  SNS,
}) => {
  //NAV
  const navigation = useNavigation();
  // const goToDetail = () => {
  //   //@ts-ignore
  //   navigation.navigate("Stack", {
  //     screen: "Detail",
  //     params: {
  //       ...fullData,
  //     },
  //   });
  // };
  return (
    <ListContainer>
      <Container>
        <TextContainer>
          <Title>{title}</Title>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 146,
            }}
          >
            <ProjectTitle>{fullData.project.title}</ProjectTitle>
            <MiddleBarSVG width={11} />
            <Date>22.09.24</Date>
          </View>
        </TextContainer>
        <ProjectLogo source={{ uri: thumbnail }}></ProjectLogo>
      </Container>
      <BlueTags>#SAMPLE #SAMPLE</BlueTags>
    </ListContainer>
  );
};

export default SmallHCard;
