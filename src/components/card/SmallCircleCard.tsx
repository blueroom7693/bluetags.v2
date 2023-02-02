import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { Text, TouchableOpacity } from "react-native";
import { AllNftNonChain } from "../../AllNft";
import { useRecoilState, useRecoilValue } from "recoil";
import { projectString } from "../../atom";

interface ICircleProject {
  title: string;
}
//CSS
const ProjectLogo = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background-color: black;
  margin-bottom: 12px;
`;
const Container = styled.View`
  background-color: ${(props) => props.theme.Bg0dp};
  align-items: center;
  width: 48px;
  height: 66px;
  justify-content: flex-start;
`;
const ProjectName = styled.Text`
  font-size: 9px;
`;

//MAIN
const SmallCircleCard: React.FC<ICircleProject> = ({ title }) => {
  const [project, setProject] = useRecoilState(projectString);

  return (
    <TouchableOpacity
      onPress={() => {
        setProject(title);
      }}
    >
      <Container>
        <ProjectLogo
          source={{ uri: AllNftNonChain[title].logourl }}
        ></ProjectLogo>
        {/* <ProjectName>{title}</ProjectName> */}
      </Container>
    </TouchableOpacity>
  );
};

export default SmallCircleCard;
