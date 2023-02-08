import styled from "styled-components/native";

const BlueTags = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 24px;
  margin-right: 10px;
  padding: 0px 15px;
  border-radius: 100px 9px 200px 100px;
  background-color: ${(props) => props.Bg0dp};
  color: ${(props) => props.Text0dp};
  font-size: 12px;
  font-weight: 600;
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
      {text}
    </BlueTags>
  );
}
