import { timetable } from "@/constants/timetable";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function TimetableScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Timetable</Text>

      <FlatList
        data={timetable}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.day}>{item.day}</Text>

            {item.subjects.map((subject, index) => (
              <Text key={index} style={styles.subject}>
                • {subject}
              </Text>
            ))}
          </View>
        )}
      />
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
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },

  day: {
    fontWeight: "bold",
    marginBottom: 6,
  },

  subject: {
    marginLeft: 10,
  },
});
