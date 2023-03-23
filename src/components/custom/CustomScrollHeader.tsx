import React, { useEffect, useRef } from "react";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";

const CustomScrollHeader = ({ animatedValue, children }) => {
  const diff_Clamp = Animated.diffClamp(animatedValue, 0, 100);
  const headerHeight = diff_Clamp.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 0],
    extrapolate: "clamp",
  });

  const opacity = diff_Clamp.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 1],
    extrapolate: "clamp",
  });

  const headerTransform = diff_Clamp.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.header,
        { height: headerHeight, opacity },
        { transform: [{ translateY: headerTransform }] },
      ]}
    >
      {children}
      {/* <Text style={styles.headerText}>Header</Text> */}
    </Animated.View>
  );
};

export default CustomScrollHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  headerText: {
    color: "white",
    fontSize: 24,
  },
  scrollView: {
    marginTop: 100,
  },
  contentContainer: {
    padding: 16,
  },
  listItem: {
    backgroundColor: "lightgray",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  listItemText: {
    fontSize: 18,
  },
});
