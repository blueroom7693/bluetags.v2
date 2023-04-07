import React, { useContext } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import BackgroundSVG from "../../assets/images/misc/backgroundOrdo.svg";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.Bg0dp};
  padding: 0px 20px;
  padding-top: 20px;
`;

const Logo = styled.Image`
  max-width: 100%;
  /* width: 100%;
  height: 100px; */
  /* width: 350px; */
  height: 320px;
  margin: 0 auto;
  margin-bottom: 20px;
  border-radius: 20px;
`;

export default function AuthLayout({ children }) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const theme = useContext(ThemeContext);

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={dismissKeyboard}
      disabled={Platform.OS === "web"}
    >
      <Container>
        <KeyboardAvoidingView
          style={{
            width: "95%",
          }}
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? 50 : -200}
        >
          {/* <BackgroundSVG width={350} height={350}></BackgroundSVG> */}
          <Logo
            // resizeMode="contain"
            source={require("../../assets/images/backgroundOrdo.png")}
          />
          {children}
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
