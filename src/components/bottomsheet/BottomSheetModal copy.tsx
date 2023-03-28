import React, { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import BottomSheetModal from "@gorhom/bottom-sheet";

const MyBottomSheetModal = ({ navigation }) => {
  const bottomSheetModalRef = useRef(null);

  // Bottom sheet modal methods
  const handlePresentModalPress = () => {
    bottomSheetModalRef.current.present();
  };

  const handleDismissModalPress = () => {
    bottomSheetModalRef.current.dismiss();
    navigation.goBack();
  };

  console.log(123132);
  useEffect(() => {
    handlePresentModalPress();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={["25%", "50%"]}
        handleComponent={() => (
          <View
            style={{
              backgroundColor: "#eee",
              height: 5,
              borderRadius: 5,
              alignSelf: "center",
              width: "10%",
              marginTop: 6,
            }}
          />
        )}
      >
        <View style={{ paddingHorizontal: 20 }}>
          {/* Your bottom sheet modal content */}
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            My Bottom Sheet Modal
          </Text>
          <Text style={{ marginTop: 10 }}>
            This is an example of a bottom sheet modal.
          </Text>

          {/* Close button */}
          <TouchableOpacity
            style={{
              backgroundColor: "blue",
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
              marginTop: 20,
            }}
            onPress={handleDismissModalPress}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Close Modal
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
    </View>
  );
};

export default MyBottomSheetModal;
