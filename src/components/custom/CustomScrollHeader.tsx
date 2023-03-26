import React, { useEffect, useRef } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { faBell } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";

const DefaultHeader = styled.View`
  height: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
//HEADER LOGO
const HeaderLogo = styled.Image`
  width: 120px;
  height: 30px;
`;
const HeaderRight = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CustomScrollHeader = ({ animatedValue, children }) => {
  const navigation = useNavigation();

  //
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
      {/* <DefaultHeader>
        <HeaderLogo
          source={require("../../assets/images/Frame.png")}
          style={{
            width: 104,
            resizeMode: "contain",
            marginLeft: 20,
          }}
        />
        <HeaderRight>
          <TouchableOpacity
          // onPress={() =>
          //   navigation.navigate("Stack", {
          //     screen: "Notification",
          //     params: {},
          //   })
          // }
          >
            <FontAwesomeIcon
              icon={faBell}
              color="rgb(0, 117, 255)"
              size={22}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
          <Ionicons
            name="search"
            // color="rgb(0, 117, 255)"
            color="grey"
            style={{ marginRight: 10 }}
            size={24}
            onPress={() =>
              navigation.navigate("Stack", {
                screen: "Search",
                params: {
                  // ...fullData,
                },
              })
            }
          />
          <Ionicons
            name={"person"}
            // color={theme.Text0dp}
            // color="rgb(0, 117, 255)"
            color="grey"
            style={{ marginRight: 30 }}
            size={24}
            onPress={() =>
              navigation.navigate("Stack", {
                screen: "Profile",
                params: {
                  // ...fullData,
                },
              })
            }
          />
        </HeaderRight>
      </DefaultHeader> */}
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
    zIndex: 1,
  },
});
