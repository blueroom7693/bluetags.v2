import React, { useCallback, useRef, useMemo, useState } from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  chainString,
  isBottomFilter,
  projectString,
  snstString,
} from "../../atom";
import styled from "styled-components/native";
import CustomBackground from "../custom/CustomBackground";
import { Entypo } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import BlueTag from "../Bluetag";

const BottomFilter = () => {
  // hooks
  const sheetRef = useRef<BottomSheet>(null);
  // SNAPPOINT
  const snapPoints = ["55%"];
  //ISOPEN RECOIL
  const [isOpen, setIsOpen] = useRecoilState(isBottomFilter);
  //FILTER RECOIL
  //selector
  const [chain, setChain] = useRecoilState(chainString);
  const [project, setProject] = useRecoilState(projectString);
  const [sns, setSns] = useRecoilState(snstString);
  console.log(chain);
  //CSS
  const BottomContainerText = styled.Text`
    color: white;
    font-size: 20px;
    padding-left: 20px;
  `;
  const TopSection = styled.View`
    border-bottom-width: 1px;
    border-color: grey;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `;

  return isOpen ? (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={() => setIsOpen(false)}
      // backdropComponent
      // backgroundComponent={CustomBackground}
      backgroundStyle={styles.container}
    >
      {/* <BottomSheetBackdrop></BottomSheetBackdrop> */}
      <BottomSheetView style={styles.container}>
        <TopSection>
          <BottomContainerText>Filter</BottomContainerText>
          <Entypo name="cross" size={36} color="white" />
        </TopSection>
        <BottomContainerText>hello</BottomContainerText>
        <BottomContainerText>hello</BottomContainerText>
        {/* <BlueTag>hi</BlueTag> */}
        {/* picker */}
        <Picker
          selectedValue={chain}
          onValueChange={(itemValue, itemIndex) => setChain(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="ALL" value="" />
          <Picker.Item label="ETH" value="ETH" />
          <Picker.Item label="SOL" value="SOL" />
          <Picker.Item label="KLAY" value="KLAY" />
        </Picker>
        <Picker
          selectedValue={sns}
          onValueChange={(itemValue, itemIndex) => setSns(itemValue)}
        >
          <Picker.Item label="ALL" value="" />
          <Picker.Item label="twitter" value="twitter" />
          <Picker.Item label="discord" value="discord" />
        </Picker>
        {/* picker */}
      </BottomSheetView>
    </BottomSheet>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3d3d3d",
  },
  picker: {
    height: 20,
    width: 100,
    backgroundColor: "grey",
    borderWidth: 50,
    borderColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 100,
  },
});

export default BottomFilter;
