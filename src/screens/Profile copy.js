import styled, { ThemeContext } from "styled-components/native";
import React, { useEffect, useRef, useState } from "react";
import { Text, StyleSheet, SafeAreaView, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBackward,
  faChevronRight,
  faCircleDollar,
  faClockRotateLeft,
  faDownToBracket,
} from "@fortawesome/pro-regular-svg-icons";
import {
  faGear,
  faRightFromBracket,
  faSquareUser,
} from "@fortawesome/pro-light-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { useRecoilState } from "recoil";
import { isLogined } from "../atom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import useMutation from "../libs/client/useMutation";
import axios from "axios";

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${(props) => props.theme.Bg0dp};
  flex-direction: column;
  width: 100%;
`;

const ProfileContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 20px;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.BgBorder};
`;

const OptionContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 20px;
  margin-bottom: -10px;
  margin-top: -10px;
`;

const ProfileImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  margin-right: 20px;
`;

const Name = styled.Text`
  color: ${(props) => props.theme.Text0dp};
  font-size: 18px;
  font-weight: 400;
`;
const OptionName = styled.Text`
  color: ${(props) => props.theme.Text0dp};
  font-size: 16px;
  margin-left: 20px;
`;

const ServiceTerms = styled.Text`
  color: ${(props) => props.theme.Text1dp};
  font-size: 14px;
  margin-top: 250px;
`;

const Profile = () => {
  //
  const theme = useContext(ThemeContext);
  //logout
  const [isLogin, setIsLogin] = useRecoilState(isLogined);
  const [
    logOut,
    { data: logoutData, loading: logoutLoading, status: logoutStatus },
  ] = useMutation("https://www.bluetags.app/api/users/sign-out");

  function logoutFun() {
    logOut({}).then(() => {
      axios.get("https://www.bluetags.app/api/users").then((res) => {
        if (res.data) {
          console.log("still logined");
        } else {
          console.log("logout success");
          setIsLogin(null);
        }
      });
    });
  }
  // useEffect(() => {
  //   console.log("still not processed2");
  //   if (logoutStatus === 200) {
  //     console.log("still not processed");

  //     axios.get("https://www.bluetags.app/api/users/check").then((response) => {
  //       if (response.data) {
  //         console.log("still logined");
  //       } else {
  //         setIsLogin(false);
  //       }
  //     });
  //   }
  // }, [logoutStatus]);

  //logout
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("sangwan");
      setIsLogin(false);
    } catch (e) {}
  };

  // const [userInfo, setUserInfo] = useState();
  // AsyncStorage.getItem("sangwan").then((e) => setUserInfo(e));
  // console.log(userInfo);

  return (
    <SafeAreaView style={styles.container}>
      <Container>
        <ProfileContainer>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <ProfileImage
              source={{
                uri: "https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000",
              }}
            />
            <Name>SANGWAN KIM</Name>
          </View>
          <FontAwesomeIcon
            icon={faChevronRight}
            color={theme.Text0dp}
            size={18}
          />
        </ProfileContainer>
        <OptionContainer>
          <FontAwesomeIcon
            icon={faSquareUser}
            color={theme.Text0dp}
            size={24}
          />
          <OptionName>??? ??????</OptionName>
        </OptionContainer>
        <OptionContainer>
          <FontAwesomeIcon
            icon={faDownToBracket}
            color={theme.Text0dp}
            size={24}
          />
          <OptionName>???????????? ?????? ?????????</OptionName>
        </OptionContainer>
        <OptionContainer>
          <FontAwesomeIcon
            icon={faClockRotateLeft}
            color={theme.Text0dp}
            size={24}
          />
          <OptionName>??????</OptionName>
        </OptionContainer>
        <OptionContainer>
          <FontAwesomeIcon icon={faBackward} color={theme.Text0dp} size={24} />
          <OptionName>??? Recap</OptionName>
        </OptionContainer>
        <OptionContainer>
          <FontAwesomeIcon
            icon={faCircleDollar}
            color={theme.Text0dp}
            size={24}
          />
          <OptionName>?????? ?????????</OptionName>
        </OptionContainer>
        <OptionContainer>
          <FontAwesomeIcon icon={faGear} color={theme.Text0dp} size={24} />
          <OptionName>??????</OptionName>
        </OptionContainer>
        <OptionContainer>
          <FontAwesomeIcon
            icon={faCircleQuestion}
            color={theme.Text0dp}
            size={24}
          />
          <OptionName>????????????</OptionName>
        </OptionContainer>
        <OptionContainer onPress={logoutFun}>
          <FontAwesomeIcon
            icon={faRightFromBracket}
            color={theme.Text0dp}
            size={24}
          />
          <OptionName>????????????</OptionName>
        </OptionContainer>
        <ServiceTerms>???????????????????????? ??? ???????????????</ServiceTerms>
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Profile;
