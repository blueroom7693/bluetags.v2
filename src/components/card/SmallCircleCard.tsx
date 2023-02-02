import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { Text, TouchableOpacity, View } from "react-native";
import { AllNftNonChain } from "../../AllNft";
import { useRecoilState, useRecoilValue } from "recoil";
import { projectString } from "../../atom";
import axios from "axios";

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
  width: 58px;
  height: 75px;
  justify-content: flex-start;
`;
const ProjectName = styled.Text`
  font-size: 9px;
  color: ${(props) => props.theme.Text0dp};
  font-weight: 700;
  text-align:center
  font-family: "SpoqaHanSansNeo-Regular";
`;

//MAIN
const SmallCircleCard: React.FC<ICircleProject> = ({ title }) => {
  //Filtering
  const [project, setProject] = useRecoilState(projectString);
  //axios project info
  const [projectInfo, setProjectInfo] = useState();
  useEffect(() => {
    axios.get(`https://www.bluetags.app/api/projects/${title}`).then((res) => {
      setProjectInfo(res.data.project);
    });
  }, [title]);

  return projectInfo ? (
    <TouchableOpacity
      onPress={() => {
        setProject(title);
      }}
    >
      <Container>
        <ProjectLogo
          // source={{ uri: AllNftNonChain[title].logourl }}
          source={{ uri: `${projectInfo.logoUrl}` }}
        ></ProjectLogo>
        {/* <ProjectName>{title}</ProjectName> */}
        <ProjectName>{projectInfo.title}</ProjectName>
      </Container>
    </TouchableOpacity>
  ) : null;
};

export default SmallCircleCard;
