import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const CalendarPage = () => {
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

export default CalendarPage;
