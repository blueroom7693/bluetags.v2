import React, { useContext, useEffect, useRef, useState } from "react";
import { View, TouchableOpacity } from "react-native";

import { isLogined } from "../atom";
import { useRecoilState } from "recoil";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

import styled, { ThemeContext } from "styled-components/native";
import { logUserIn } from "../async";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { TextInput } from "../components/auth/AuthShared";

import GoogleSVG from "../assets/images/misc/google.svg";
import FacebookSVG from "../assets/images/misc/facebook.svg";
import TwitterSVG from "../assets/images/misc/twitter.svg";
import useMutation from "../libs/client/useMutation";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useIsFocused } from "@react-navigation/native";

const SubText = styled.Text`
  font-size: 12px;
  font-weight: 700;
  color: ${(props) => props.theme.Text0dp};
  margin-bottom: 10px;
`;
const ErrorText = styled.Text`
  color: ${(props) => props.theme.Text0dp};
  margin-bottom: 10px;
`;

const DetailText = styled.Text`
  color: ${(props) => props.theme.Text0dp};
  font-size: 12px;
  font-weight: 700;
  text-decoration-line: underline;
  text-align: right;
  font-family: "SpoqaHanSansNeo-Regular";
  margin-top: 15px;
`;

const SNSlogo = styled.TouchableOpacity`
  margin-left: 10px;
`;
const SignupBox = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${(props) => props.theme.Primary1dp};
  height: 40px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 15px;
`;
const SignupText = styled.Text`
  color: ${(props) => props.theme.Primary1dp};
  font-size: 14px;
  font-weight: 700;
  font-family: "SpoqaHanSansNeo-Regular";
`;
const SignupGoogleBox = styled.TouchableOpacity`
  border-width: 1px;
  height: 40px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 30px;
`;
const SignupGoogleText = styled.Text`
  color: ${(props) => props.theme.Text0dp};
  font-size: 14px;
  font-weight: 700;
  font-family: "SpoqaHanSansNeo-Regular";
`;

interface IForm {
  email: string;
  password: string;
}
interface LoginResponse {
  error?: string;
  auth?: string;
}
const LoginScreen = ({ navigation }) => {
  //themeprovider
  const theme = useContext(ThemeContext);
  //isfocused
  const isfoucsed = useIsFocused();
  //login Token
  // const [isLogin, setIsLogin] = useRecoilState(isLogined);

  //Google Auth
  //setUser,setToken
  const [user, setUser] = React.useState(null);
  const [accessToken, setAccessToken] = React.useState(null);
  //
  WebBrowser.maybeCompleteAuthSession();
  //Request
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "372775712005-skoe316ceiohdurrpil0k9r8la42hpl3.apps.googleusercontent.com",
    // iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    // androidClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    // webClientId: "GOOGLE_GUID.apps.googleusercontent.com",
  });

  //Response
  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
    }
  }, [response]);

  //FetchUserInfo
  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const userInfo = await response.json();
    setUser(userInfo);
  }

  //*useMutation
  //login
  const [login, { loading, data, error, status }] = useMutation<LoginResponse>(
    "https://www.bluetags.app/api/users/sign-in"
  );
  //--sociallogin
  const [
    socialLogin,
    {
      loading: socialLoading,
      data: socialData,
      error: socialError,
      status: socialStatus,
    },
  ] = useMutation("https://www.bluetags.app/api/users/sign-in/social/google");
  //*setError
  const [errorMessage, setErrorMessage] = useState("");
  //*useRecoil
  const [isLogin, setIsLogin] = useRecoilState(isLogined);
  //*useForm
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IForm>();

  //onValid
  const onValid = ({ email, password }: IForm) => {
    const body = {
      email,
      password,
    };
    // New Method Login
    if (loading) return;
    login(body);
    if (status === 200) {
      setIsLogin(true);
      console.log("login result is :");
      //async storage
      logUserIn(data);
    }
    setErrorMessage(error);
  };

  //social login
  useEffect(() => {
    if (user && !socialLoading) {
      socialLogin({ name: user.name, email: user.email, image: user.picutre });
    }
  }, [user]);

  // reference
  const passwordRef = useRef();

  // onNext
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  // register
  useEffect(() => {
    register("email", {
      required: true,
    });
    register("password", {
      required: true,
    });
  }, [register]);

  //usercheck
  useEffect(() => {
    axios.get("https://www.bluetags.app/api/users/check").then((response) => {
      console.log(response.data);
      if (response.data) {
        console.log("user ON");
        setIsLogin(true);
      } else {
        console.log("user OFF");
        setIsLogin(false);
      }
    });
  }, [status, socialStatus, socialData, socialLoading, user]);

  //RETURN
  return (
    <AuthLayout>
      <SubText>E-mail</SubText>
      <TextInput
        value={watch("email")}
        placeholder="email"
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("email", text)}
      />
      <SubText>Password</SubText>

      <TextInput
        value={watch("password")}
        ref={passwordRef}
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue("password", text)}
      />
      <ErrorText>{errorMessage}</ErrorText>
      <SignupGoogleBox
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      >
        <SignupGoogleText>Sign in with google</SignupGoogleText>
        <SNSlogo>
          <GoogleSVG height={20} width={20} />
        </SNSlogo>
      </SignupGoogleBox>

      <AuthButton
        text="Log In"
        // loading={loading}
        disabled={!watch("email") || !watch("password")}
        onPress={handleSubmit(onValid)}
      />
      <DetailText>Forgot your password ?</DetailText>
      <SignupBox onPress={() => navigation.navigate("Register")}>
        <SignupText> Sign up</SignupText>
      </SignupBox>
    </AuthLayout>
  );
};

export default LoginScreen;
