import React, { useCallback, useRef, useMemo, useState } from "react";
import { StyleSheet, View, Text, Button, Image, Animated } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  chainString,
  isBottomFilter,
  projectString,
  snstString,
} from "../../atom";
import styled, { ThemeConsumer, useTheme } from "styled-components/native";
import CustomBackdrop from "./customBackdrop";
import BlueTag from "../Bluetag";

//CSS
const BottomContainerText = styled.Text`
  color: ${(props) => props.theme.Text0dp};
  font-size: 17px;
  font-family: "SpoqaHanSansNeo-Regular";
  font-weight: 700;
`;
const TopSection = styled.View`
  /* border-bottom-width: 1px; */
  border-color: grey;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 42px;
  margin-bottom: 10px;
`;

const BluetagsBox = styled.View`
  max-width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  /* padding-left: 15px;
  padding-right: 15px; */
`;

const BottomFilter = () => {
  // hooks
  const sheetRef = useRef<BottomSheet>(null);
  // SNAPPOINT
  // const snapPoints = ["55%"];
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  //ISOPEN RECOIL
  const [isOpen, setIsOpen] = useRecoilState(isBottomFilter);
  //FILTER RECOIL
  const [chain, setChain] = useRecoilState(chainString);
  const [project, setProject] = useRecoilState(projectString);
  const [sns, setSns] = useRecoilState(snstString);

  const ARRAY = [
    "hello",
    "hello",
    "helloadsfasdf",
    "hello",
    "helloasdfasdf",
    "hello",
    "helloasdfasd",
    "hello",
    "hello",
    "heasdfllo",
    "helasdflo",
    "hellasdfasdfo",
    "hello",
    "hello",
    "helloasdfasdf",
    "hellasdfo",
    "hello",
    "helasdfasdflo",
    "hello",
    "helasdfasdflo",
  ];

  return isOpen ? (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      index={1}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      onClose={() => setIsOpen(false)}
      // backdropComponent
      // backgroundComponent={CustomBackground}
      // backgroundStyle={styles.container}
      backdropComponent={CustomBackdrop}
      style={styles.sheet}
    >
      {/* <BottomSheetBackdrop></BottomSheetBackdrop> */}
      <BottomSheetView style={styles.container}>
        <TopSection>
          <BottomContainerText>BlueTag Filtering</BottomContainerText>
        </TopSection>
        <BlueTag
          color="#3733FF"
          isWhite="false"
          text="hello"
          bluetags={ARRAY}
        />
      </BottomSheetView>
    </BottomSheet>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 10,
    padding: 20,
    // zIndex: 0,
    // position: "absolute",
    // zIndex: 1,
  },
  sheet: {
    position: "absolute",
    zIndex: 1,
  },
});

export default BottomFilter;
