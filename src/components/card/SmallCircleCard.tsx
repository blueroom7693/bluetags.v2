import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { AllNftNonChain } from "../../AllNft";
import { useRecoilState, useRecoilValue } from "recoil";
import { projectString } from "../../atom";
import axios from "axios";

interface ICircleProject {
  title: string;
}
//CSS
const ProjectLogo = styled.View<{ isSelected: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  margin-bottom: 12px;
  overflow: hidden;
  border-width: ${(props) => (props.isSelected ? "2px" : "0px")};

  border-color: rgba(48, 121, 246, 0.6);
`;
const Container = styled.View`
  background-color: ${(props) => props.theme.Bg0dp};
  align-items: center;
  width: 58px;
  height: 15px;
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
        if (project === title) {
          setProject("");
        } else {
          setProject(title);
        }
      }}
    >
      <Container>
        <ProjectLogo isSelected={project === title ? true : false}>
          <Image
            source={{ uri: `${projectInfo.logoUrl}` }}
            style={{ width: "100%", height: "100%" }}
          ></Image>
        </ProjectLogo>
        <ProjectName>{projectInfo.title}</ProjectName>
      </Container>
    </TouchableOpacity>
  ) : null;
};

export default SmallCircleCard;
