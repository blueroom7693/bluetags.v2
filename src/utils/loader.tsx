import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native";

const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator animating={true} size="large" color="#0075ff" />
    </View>
  );
};

export default Loader;
