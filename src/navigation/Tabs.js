import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import styled from "styled-components";
import { DrawerActions } from "@react-navigation/native";
import Watchlist from "../screens/Watchlist";
import { useRecoilState, useRecoilValue } from "recoil";
import { isBottomFilter } from "../atom";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHexagonVerticalNft } from "@fortawesome/pro-light-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import NFT from "../screens/NFT";
import Home from "../screens/Home";
import { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import * as NavigationBar from "expo-navigation-bar";
import NewsPage from "../screens/News";
import CalendarPage from "../screens/Calendar";

DrawerActions;

const DrawerBtnContainer = styled.View`
  margin-left: 15px;
`;

const HeaderRight = styled.View`
  flex-direction: row;
`;
const HeaderLeft = styled.View`
  flex-direction: row;
`;

const Tab = createBottomTabNavigator();

//HEADER LOGO
const HeaderLogo = styled.Image`
  width: 120px;
  height: 30px;
  /* border-radius: 30px; */
`;

function LogoTitle() {
  return (
    <HeaderLogo
      source={require("../assets/images/Frame.png")}
      style={{
        width: 104,
        resizeMode: "contain",
        marginLeft: 20,
      }}
    />
  );
}
const Tabs = () => {
  const theme = useContext(ThemeContext);
  NavigationBar.setBackgroundColorAsync(`${theme.Tabbar}`);

  const isTabBar = useRecoilValue(isBottomFilter);
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: `${theme.Bg0dp}`,
        // isDark ? BLACK_COLOR : BLACK_COLOR,
      }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: `${theme.Tabbar}`,
          height: 50,
          position: "absolute",
          borderTopWidth: 0,
          // borderTopColor: LIGHT_GREY,
          display: isTabBar ? "none" : "flex",
        },
        tabBarActiveTintColor: `${theme.TabbarActive}`,
        tabBarInactiveTintColor: `${theme.TabbarInactive}`,
        headerStyle: {
          backgroundColor: `${theme.Bg0dp}`,
        },
        headerTitleStyle: {
          color: `${theme.Text0dp}`,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "700",
          fontFamily: "SpoqaHanSansNeo-Regular",
        },
        headerShown: true,
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={({ navigation, route }) => ({
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name={"home-filled"} color={color} size={24} />
          ),
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: ({ color, size }) => (
            <HeaderRight>
              {/* <FontAwesomeIcon
                icon={faFilter}
                color={theme.Text0dp}
                size={22}
              />
              <MaterialIcons
                name={"home-filled"}
                color={theme.Text0dp}
                size={24}
              /> */}
              <Ionicons
                name="search"
                // color={theme.Text0dp}
                // color="rgb(0, 117, 255)"
                color="grey"
                style={{ marginRight: 20 }}
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
          ),
        })}
      />
      <Tab.Screen
        name="News"
        component={NewsPage}
        options={({ navigation, route }) => ({
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-newspaper-outline" color={color} size={24} />
          ),
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: ({ color, size }) => (
            <HeaderRight>
              <Ionicons
                name="search"
                // color={theme.Text0dp}
                color="rgb(0, 117, 255)"
                style={{ marginRight: 20 }}
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
                color="rgb(0, 117, 255)"
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
          ),
        })}
      />

      <Tab.Screen
        name="Watchlist"
        component={Watchlist}
        options={({ navigation, route }) => ({
          // tabBarBadge: 2,
          // tabBarBadgeStyle: { backgroundColor: "red" },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={24} />
          ),
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: ({ color, size }) => (
            <HeaderRight>
              {/* <FontAwesomeIcon
                icon={faFilter}
                color={theme.Text0dp}
                size={22}
              />
              <MaterialIcons
                name={"home-filled"}
                color={theme.Text0dp}
                size={24}
              /> */}
              <Ionicons
                name="search"
                // color={theme.Text0dp}
                color="rgb(0, 117, 255)"
                style={{ marginRight: 20 }}
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
                color="rgb(0, 117, 255)"
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
          ),
        })}
      />

      <Tab.Screen
        name="Calendar"
        component={CalendarPage}
        options={({ navigation, route }) => ({
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-sharp" color={color} size={24} />
          ),
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: ({ color, size }) => (
            <HeaderRight>
              <Ionicons
                name="search"
                // color={theme.Text0dp}
                color="rgb(0, 117, 255)"
                style={{ marginRight: 20 }}
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
                color="rgb(0, 117, 255)"
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
          ),
        })}
      />

      <Tab.Screen
        name="NFT"
        component={NFT}
        options={({ navigation, route }) => ({
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon
              icon={faHexagonVerticalNft}
              color={color}
              size={24}
            />
          ),
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: ({ color, size }) => (
            <HeaderRight>
              {/* <FontAwesomeIcon
                icon={faFilter}
                color={theme.Text0dp}
                size={22}
              />
              <MaterialIcons
                name={"home-filled"}
                color={theme.Text0dp}
                size={24}
              /> */}
              <Ionicons
                name="search"
                // color={theme.Text0dp}
                color="rgb(0, 117, 255)"
                style={{ marginRight: 20 }}
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
                color="rgb(0, 117, 255)"
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
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
