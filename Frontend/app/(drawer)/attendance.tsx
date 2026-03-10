import { StyleSheet, Text, View } from "react-native";

export default function AttendanceScreen() {
  const attendance = {
    total: 120,
    present: 105,
    absent: 15,
  };

  const percentage = ((attendance.present / attendance.total) * 100).toFixed(1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Attendance</Text>

      <View style={styles.card}>
        <Text>Total Classes: {attendance.total}</Text>
        <Text>Present: {attendance.present}</Text>
        <Text>Absent: {attendance.absent}</Text>
        <Text>Attendance: {percentage}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F6FA",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },
});
