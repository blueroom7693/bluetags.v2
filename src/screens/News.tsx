import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const NewsPage = () => {
  //유저정보 업데이트
  const isfoucsed = useIsFocused();
  useEffect(() => {
    if (isfoucsed) {
      axios.get("https://www.bluetags.app/api/users").then((res) => {
        // setSubscribeProject(res.data.subscribe);
        // setUser(res.data.id);
        axios
          .get(`https://www.bluetags.app/api/bluecards?user=${res.data.id}`)
          .then((respose) => {
            // setNftData(Object.values(respose.data.bluecards)[2]);
            // setIsLoadingNft(false);
          });
      });
    }
    console.log("와치리스트 페이지 들어옴");
  }, [isfoucsed]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>hi</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NewsPage;
