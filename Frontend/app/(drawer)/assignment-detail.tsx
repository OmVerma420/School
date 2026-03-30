import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View, Linking, ScrollView } from "react-native";

export default function AssignmentDetailScreen() {
  // Grab the data passed from the Assignments Screen
  const { title, subject, description, dueDate, fileUrl, teacherName } = useLocalSearchParams();

  // Function to open the teacher's attachment in the phone's browser
  const openAttachment = async () => {
    if (fileUrl) {
      const supported = await Linking.canOpenURL(fileUrl as string);
      if (supported) {
        await Linking.openURL(fileUrl as string);
      } else {
        alert("Cannot open this file link.");
      }
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Header Info */}
      <View style={styles.headerCard}>
        <Text style={styles.subject}>{subject}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.metaText}>Assigned by: <Text style={styles.metaBold}>{teacherName}</Text></Text>
        <Text style={styles.metaText}>Due Date: <Text style={styles.metaBold}>{dueDate}</Text></Text>
      </View>

      {/* Instructions / Description */}
      <View style={styles.detailsCard}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.description}>
          {description || "No additional instructions provided by the teacher."}
        </Text>
      </View>

      {/* Only show the Download/View button if the teacher actually attached a file URL */}
      {fileUrl ? (
        <TouchableOpacity style={styles.downloadBtn} onPress={openAttachment}>
          <Text style={styles.btnText}>View Attached Material</Text>
        </TouchableOpacity>
      ) : null}
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F6FA" },
  
  headerCard: { backgroundColor: "#fff", padding: 20, borderRadius: 12, marginBottom: 20, elevation: 1 },
  subject: { color: "#4A6CF7", fontSize: 14, fontWeight: "bold", textTransform: "uppercase", marginBottom: 5 },
  title: { fontSize: 24, fontWeight: "bold", color: "#1a1a2e", marginBottom: 15 },
  metaText: { fontSize: 14, color: "#666", marginBottom: 4 },
  metaBold: { color: "#333", fontWeight: "600" },

  detailsCard: { backgroundColor: "#fff", padding: 20, borderRadius: 12, marginBottom: 25, elevation: 1 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#1a1a2e", marginBottom: 10 },
  description: { fontSize: 15, color: "#444", lineHeight: 24 },

  downloadBtn: { backgroundColor: "#2ECC71", padding: 16, borderRadius: 10, alignItems: "center" },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});