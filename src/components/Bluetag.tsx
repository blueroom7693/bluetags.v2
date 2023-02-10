import { Text } from "react-native";
import styled from "styled-components/native";

const BlueTags = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 24px;
  margin-right: 10px;
  /* padding-left: 10px;
  padding-right: 15px; */
  background-color: rgba(0, 117, 255, 0.7);
  border-bottom-left-radius: 24px;
  border-top-left-radius: 24px;
  border-bottom-right-radius: 48px;

  /* color: ${(props) => props.Text0dp}; */
`;
const BlueTagsName = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: white;
  margin-left: 15px;
  margin-right: 20px;
`;

interface Props {
  color: string;
  width?: string;
  isWhite: string;
  text: string;
  className?: string;
}

export default function BlueTag({ color, isWhite, text, className }: Props) {
  return (
    <BlueTags
      color={color}
      isWhite={isWhite}
      className={className ? className : ""}
    >
      <BlueTagsName>{text}</BlueTagsName>
    </BlueTags>
  );
}
