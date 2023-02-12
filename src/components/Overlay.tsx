import React from "react";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";

const Overlay = (props) => {
  return (
    <Modal animationType="fade" visible={true} transparent={true}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.backDrop}
        onPress={() => props.hideModal()}
      ></TouchableOpacity>
    </Modal>
  );
};

export default Overlay;

const styles = StyleSheet.create({
  backDrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.60)",
  },
});
