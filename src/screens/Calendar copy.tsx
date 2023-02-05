import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { useEffect } from "react";
import { Modal, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

const CalendarPage = () => {
  return (
    // <SafeAreaView style={styles.container}>
    <View>
      <Calendar
        markingType="multi-period"
        markedDates={{
          "2023-02-05": {
            periods: [
              { startingDay: false, endingDay: true, color: "#5f9ea0" },
              { startingDay: false, endingDay: true, color: "#ffa500" },
              { startingDay: true, endingDay: false, color: "#f0e68c" },
              { startingDay: true, endingDay: false, color: "#f0e68c" },
              { startingDay: true, endingDay: false, color: "#f0e68c" },
              { startingDay: true, endingDay: false, color: "#f0e68c" },
              { startingDay: true, endingDay: false, color: "#f0e68c" },
              { startingDay: true, endingDay: false, color: "#f0e68c" },
            ],
          },
          "2017-12-15": {
            periods: [
              { startingDay: true, endingDay: false, color: "#ffa500" },
              { color: "transparent" },
              { startingDay: false, endingDay: false, color: "#f0e68c" },
            ],
          },
        }}
      />
    </View>
    // </SafeAreaView>
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
