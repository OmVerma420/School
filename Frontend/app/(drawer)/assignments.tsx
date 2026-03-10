import { assignments } from "@/constants/assignments";
import { router } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AssignmentsScreen() {
  const renderAssignment = ({ item }: any) => {
    const statusColor = item.status === "Submitted" ? "#2ECC71" : "#E67E22";

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push({
            pathname: "/(drawer)/assignment-detail",
            params: { id: item.id },
          })
        }
      >
        <Text style={styles.subject}>{item.subject}</Text>

        <Text style={styles.title}>{item.title}</Text>

        <Text style={styles.date}>Due: {item.dueDate}</Text>

        <Text style={[styles.status, { color: statusColor }]}>
          {item.status}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Assignments</Text>

      <FlatList
        data={assignments}
        keyExtractor={(item) => item.id}
        renderItem={renderAssignment}
        showsVerticalScrollIndicator={false}
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

  screenTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },

  subject: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },

  title: {
    fontSize: 16,
    marginBottom: 6,
  },

  date: {
    color: "#555",
    fontSize: 13,
  },

  status: {
    marginTop: 6,
    fontWeight: "600",
  },
});
