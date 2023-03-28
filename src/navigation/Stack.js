import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BLACK_COLOR, LIGHT_GREY } from "../colors";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import Detail from "../screens/Detail";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import DetailArticle from "../screens/DetailArticle";
import { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import Notification from "../screens/Notification";
import { BlurView } from "expo-blur";
import MyBottomSheetModal from "../components/bottomsheet/BottomSheetModal copy";

const NativeStack = createNativeStackNavigator();
const HeaderLogo = styled.Image``;

//test
function LogoTitle() {
  return (
    <View
      style={{
        width: 200,
        height: 100,
        backgroundColor: "black",
        opacity: 0.5,
      }}
    >
      <Image
        style={{ width: 50, height: 50 }}
        source={{ uri: "https://cdn.logo.com/hotlink-ok/logo-social.png" }}
      />
    </View>
  );
}

const Stack = () => {
  const theme = useContext(ThemeContext);
  const isDark = useColorScheme() === "dark";

  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: `${theme.Bg0dp}`,
          // backgroundColor: "transparent",
          height: 48,
          justifyContent: "center",
          alignItems: "center",
          opacity: 0,
        },
        headerTitleStyle: {
          color: `${theme.Text0dp}`,
          fontSize: 18,
          fontWeight: "400",
        },
        headerTitleAlign: "left",
        headerShown: true,
        headerTintColor: `${theme.Text0dp}`,
        // headerBackImageSource: {
        //   uri: "https://media.istockphoto.com/photos/old-rustic-wooden-cross-isolated-on-white-background-christian-faith-picture-id1054653410?b=1&k=20&m=1054653410&s=170667a&w=0&h=PBKCfoVrjPgkpkoHFhrZ1gTmL8lWiI1o_GEgq_8YwgY=",
        // },
      }}
    >
      <NativeStack.Screen
        name="DetailArticle"
        component={DetailArticle}
        options={({ navigation, route }) => ({
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialIcons name={"home-filled"} color={color} size={30} />
          // ),
          // headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: ({ color, size }) => (
            <View>
              <HeaderLogo
                source={require("../assets/images/Frame.png")}
                style={{
                  width: 85,
                  resizeMode: "contain",
                }}
              />
            </View>
          ),
          //찾았다
          // headerTransparent: true,
          // headerBackground: () => (
          //   <View style={{ backgroundColor: "black", height: 100 }}>
          //     <Text>hihihihi</Text>
          //     <Text>hihihihi</Text>
          //     <Text>hihihihi</Text>
          //     <Text>hihihihi</Text>
          //   </View>
          // ),
          // headerBackground: () => {
          //   (props) => <LogoTitle {...props} />;
          // },
        })}
      />
      <NativeStack.Screen
        name="Detail"
        component={Detail}
        options={({ navigation, route }) => ({
          headerRight: ({ color, size }) => (
            <View>
              <HeaderLogo
                source={require("../assets/images/Frame.png")}
                style={{
                  width: 85,
                  resizeMode: "contain",
                }}
              />
            </View>
          ),
          headerShown: false,
        })}
      />

      <NativeStack.Screen name="Profile" component={Profile} />
      <NativeStack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <NativeStack.Screen name="Notification" component={Notification} />
      <NativeStack.Screen
        name="MyBottomSheetModal"
        component={MyBottomSheetModal}
      />
    </NativeStack.Navigator>
  );
};

export default Stack;
