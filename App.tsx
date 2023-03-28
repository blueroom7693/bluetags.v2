import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  Text,
  useColorScheme,
  View,
  Appearance,
  SafeAreaView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, Pallet } from "./src/utils/styled";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import MyDrawer from "./src/navigation/Drawer";
import AuthStack from "./src/navigation/AuthStack";
import { RecoilRoot, useRecoilState } from "recoil";
import { isLogined, token } from "./src/atom";
import DataProvider from "./src/context/DataProvider";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserStored } from "./src/async";
import { getAllNft, IData } from "./src/axios";
import { useFonts } from "expo-font";
import BottomFilter from "./src/components/bottomsheet/BottomFilter";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import BottomSheetModalComponent from "./src/components/bottomsheet/BottomSheetModal";
import MyBottomSheetModal from "./src/components/bottomsheet/BottomSheetModal copy";

// NavigationBar.setBackgroundColorAsync("#1f1f1f");

SplashScreen.preventAutoHideAsync();

export interface IInfo {
  data: IData;
}

export default function App() {
  // 쿠키 확인 및 로그인 토큰
  const [isLogin, setIsLogin] = useRecoilState(isLogined);
  const [userToken, setUserToken] = useRecoilState(token);
  // splash screen
  const [appIsReady, setAppIsReady] = useState(false);
  //font
  const [fontsLoaded] = useFonts({
    "SpoqaHanSansNeo-Thin": require("./src/assets/fonts/SpoqaHanSansNeo-Thin.ttf"),
    "SpoqaHanSansNeo-Regular": require("./src/assets/fonts/SpoqaHanSansNeo-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        if (!fontsLoaded) {
          return;
        }
        await Font.loadAsync(Entypo.font);
        // async storage 토큰 확인
        const token = JSON.parse(await AsyncStorage.getItem("bluetags"));
        if (token !== (undefined || null)) {
          setIsLogin(true);
          setUserToken(token);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
    SplashScreen.hideAsync();
  }, [isLogin]);

  // QUERY CLIENT
  const queryClient = new QueryClient();

  // 테마 확인
  const [isLight, setIsLight] = useState(
    Appearance.getColorScheme() === "light"
  );
  Appearance.addChangeListener(() => {
    setIsLight(!isLight);
  });

  // 로그인 될 시
  return (
    <DataProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
          <NavigationContainer>
            <View style={{ flex: 1 }}>
              {isLogin ? <MyDrawer /> : <AuthStack />}
              {/* <AuthStack /> */}
              {/* <MyDrawer /> */}
              {/* <BottomFilter /> */}
            </View>
          </NavigationContainer>
        </ThemeProvider>
      </QueryClientProvider>
    </DataProvider>
  );
}
