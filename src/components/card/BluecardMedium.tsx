import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { TouchableWithoutFeedback, View } from "react-native";
import MiddleBarSVG from "../../assets/images/misc/middlebar.svg";
import BtnSVG from "../../assets/images/misc/subscribeWhite.svg";
import BlueTag from "../Bluetag";
import useMutation from "../../libs/client/useMutation";
import { userData } from "../../atom";
import { useRecoilValue } from "recoil";

//CSS
const Container = styled.View`
  background-color: ${(props) => props.theme.Bg0dp};
  width: 247px;
  height: 350px;
  margin-top: 20px;
  align-items: center;
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
  align-items: center;
  /* padding: 0px 24px 24px; */
  gap: 16px;

  width: 217px;
  height: 200px;
`;

const TitleConatainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 0px 0px;
  width: 217px;
  height: 40px;
  margin-top: 20px;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const TimeContaier = styled.View`
  width: 217px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  /* border-bottom-width: 1px; */
  border-color: rgba(0, 0, 0, 0.1);
  padding-left: 5px;
`;

const Thumbnail = styled.Image`
  width: 217px;
  height: 157px;
  border-radius: 10px;
  margin-top: 10px;
`;
const ProjectLogo = styled.Image`
  width: 17px;
  height: 17px;
  border-radius: 2px;
`;
const SnsLogo = styled.Image`
  width: 20px;
  height: 20px;
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
  /* padding-left: 15px; */
  font-family: "SpoqaHanSansNeo-Regular";
`;
const ProjectTitle = styled.Text`
  font-size: 12px;
  font-weight: 700;
  font-family: "SpoqaHanSansNeo-Regular";
  color: ${(props) => props.theme.Text0dp};
  margin-right: 10px;
`;
const BtnView = styled.TouchableOpacity<{ OnOff: boolean }>`
  width: 217px;
  height: 40px;
  background: #191f28;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-top: 15px;
  flex-direction: row;
  opacity: ${(props) => (props.OnOff ? 1 : 0.2)};
  /* opacity: 0.1; */
`;
const BtnText = styled.Text`
  font-family: "SpoqaHanSansNeo-Regular";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  color: ${(props) => props.theme.Bg0dp};
`;

//TYPE
interface IBluecardMedium {
  fullData: any;
  isBool?: boolean;
}

//MAIN
const BluecardMedium: React.FC<IBluecardMedium> = ({
  fullData,
  isBool = false,
}) => {
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
  // 유저정보가져오기
  const user = useRecoilValue(userData);
  //캘린더에 추가
  const [isCalendar, setIsCalendar] = useState(isBool);

  const [calendar, { loading, status }] = useMutation(
    "https://www.bluetags.app/api/bluecards/add-calendar"
  );

  const onClickCalendar = (bluecardId: string, projectTitle: string) => {
    if (!loading) {
      calendar({
        bluecardId,
        id: user.id,
      });
      setIsCalendar((prev) => !prev);
    }
  };
  console.log(isCalendar);
  // console.log(fullData.id);
  // console.log(fullData.id);
  // console.log(user.id);

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
        <MainContainer>
          <TitleConatainer>
            <View style={{ width: 180 }}>
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
          <BlueTag
            color="#3733FF"
            isWhite="false"
            text="hello"
            bluetags={fullData.bluetags}
            // className={"hi"}
          ></BlueTag>
          {fullData.deadLineStart && fullData.deadLineEnd ? (
            <BtnView
              OnOff={isCalendar}
              onPress={() => {
                onClickCalendar(fullData.id, fullData.title);
              }}
            >
              {isBool ? (
                <BtnText>Remove from Calendar</BtnText>
              ) : (
                <BtnText>Add to Calendar</BtnText>
              )}
              {/* <BtnText>detach Calendar</BtnText> */}
              <BtnSVG width={40} />
            </BtnView>
          ) : (
            <BtnView onPress={() => {}}>
              <BtnText>No timeline</BtnText>
              <BtnSVG width={40} />
            </BtnView>
          )}
        </MainContainer>
        {/* <BlueTags>#SAMPLE</BlueTags> */}
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default BluecardMedium;
