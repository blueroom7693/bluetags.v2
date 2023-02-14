import { Text } from "react-native";
import styled from "styled-components/native";

const BlueTags = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 24px;
  margin-right: 10px;
  margin-top: 10px;
  /* background-color: rgba(0, 117, 255, 0.7); */
  background-color: ${(props) => props.color};
  border-bottom-left-radius: 24px;
  border-top-left-radius: 24px;
  border-bottom-right-radius: 48px;
  /* border-width: 1px;
  border-color */
  /* color: ${(props) => props.Text0dp}; */
`;
const BlueTagsName = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: white;
  margin-left: 15px;
  margin-right: 20px;
`;

const BlueTagsBox = styled.View`
  max-width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`;

interface Props {
  color: string;
  width?: string;
  isWhite: string;
  text: string;
  className?: string;
  bluetags?: any;
}

export default function BlueTag({
  color,
  isWhite,
  className,
  bluetags,
}: Props) {
  return bluetags ? (
    <BlueTagsBox>
      {bluetags.map((tag, index) => (
        <BlueTags
          color={color}
          isWhite={isWhite}
          className={className ? className : ""}
          key={index}
        >
          <BlueTagsName>#{tag}</BlueTagsName>
        </BlueTags>
      ))}
    </BlueTagsBox>
  ) : null;
}
