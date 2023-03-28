import React, { useCallback, useRef } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useRecoilState } from "recoil";
import { isBottomFilter } from "../../atom";

interface BottomSheetModalProps {
  snapPoints: (string | number)[];
  children: React.ReactNode;
}

const BottomSheetModalComponent: React.FC<BottomSheetModalProps> = ({
  snapPoints,
  children,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present();
  };

  const handleDismissModalPress = () => {
    bottomSheetModalRef.current?.dismiss();
  };
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  //ISOPEN RECOIL
  const [isOpen, setIsOpen] = useRecoilState(isBottomFilter);

  return isOpen ? (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      index={0}
      onChange={handleSheetChanges}
    >
      {children}
      {/* <Button title="Dismiss Modal" onPress={handleDismissModalPress} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button title="Present Modal" onPress={handlePresentModalPress} />
      </View> */}
      <View style={styles.contentContainer}>
        <Text>hi</Text>
      </View>
    </BottomSheetModal>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
    position: "absolute",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default BottomSheetModalComponent;
