import React, { useContext } from "react";
import { ActivityIndicator } from "react-native";
import styled, { ThemeContext } from "styled-components/native";

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.Primary0dp};
  height: 40px;
  justify-content: center;
  border-radius: 4px;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.BtnInner};
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  font-family: "SpoqaHanSansNeo-Regular";
`;

export default function AuthButton({ onPress, disabled, text, loading }) {
  const theme = useContext(ThemeContext);

  return (
    <Button disabled={disabled} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </Button>
  );
}
