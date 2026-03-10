import { absentInfo } from "@/constants/absentInfo";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function AbsentInfoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Absent Information</Text>

      <FlatList
        data={absentInfo}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.date}>{item.date}</Text>
            <Text>{item.subject}</Text>
            <Text style={styles.teacher}>{item.teacher}</Text>
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
    elevation: 2,
  },

  date: {
    fontWeight: "bold",
  },

  teacher: {
    color: "gray",
  },
});
