import { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { api } from "@/services/api";

export default function AssignmentsScreen() {
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await api.get("/assignments");
      if (response.data.success) {
        setAssignments(response.data.assignments);
      }
    } catch (error) {
      console.log("Failed to fetch assignments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderAssignment = ({ item }: any) => {
    // Format the MongoDB Date nicely
    const formattedDate = new Date(item.dueDate).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    });

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          // Pass all the real assignment data to the Detail Screen
          router.push({
            pathname: "/(drawer)/assignment-detail",
            params: {
              id: item._id,
              title: item.title,
              subject: item.subject,
              description: item.description,
              dueDate: formattedDate,
              fileUrl: item.fileUrl || "",
              teacherName: item.createdBy?.name || "Teacher",
            },
          })
        }
      >
        <View style={styles.cardHeader}>
          <Text style={styles.subject}>{item.subject}</Text>
          <Text style={styles.teacher}>By {item.createdBy?.name || "Teacher"}</Text>
        </View>

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>Due: {formattedDate}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Assignments</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#4A6CF7" style={{ marginTop: 50 }} />
      ) : assignments.length === 0 ? (
        <Text style={styles.emptyText}>No assignments found for your class! 🎉</Text>
      ) : (
        <FlatList
          data={assignments}
          keyExtractor={(item: any) => item._id}
          renderItem={renderAssignment}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F6FA" },
  screenTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#1a1a2e" },
  card: { backgroundColor: "#fff", padding: 16, borderRadius: 12, marginBottom: 15, elevation: 2, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  subject: { fontWeight: "bold", fontSize: 13, color: "#4A6CF7", textTransform: "uppercase" },
  teacher: { fontSize: 12, color: "#888", fontStyle: "italic" },
  title: { fontSize: 18, fontWeight: "600", color: "#333", marginBottom: 8 },
  date: { color: "#E67E22", fontSize: 13, fontWeight: "600" },
  emptyText: { textAlign: "center", color: "#666", marginTop: 50, fontSize: 16 }
});