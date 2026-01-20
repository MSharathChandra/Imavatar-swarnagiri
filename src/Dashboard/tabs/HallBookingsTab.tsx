import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HallBookingsTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HALL BOOKINGS</Text>
      <Text style={styles.text}>Content goes here.</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "800", marginBottom: 8 },
  text: { fontSize: 14, color: "#444" },
});
