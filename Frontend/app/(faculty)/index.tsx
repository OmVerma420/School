import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useUser } from "@/context/UserContext";
import DashboardCard from "@/components/DashboardCard";
import { router } from "expo-router";

export default function FacultyDashboard() {
  const { user } = useUser();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome back,</Text>
        <Text style={styles.name}>{user?.name} 👋</Text>
        <Text style={styles.roleTag}>Faculty Portal</Text>
      </View>

      <View style={styles.grid}>
        <DashboardCard 
          title="Assignments" 
          icon="add-circle" 
          color="#FF4D4D" 
          onPress={() => router.push("/(faculty)/create-assignment")} 
        />
        <DashboardCard 
          title="Notices" 
          icon="notifications" 
          color="#E67E22" 
          onPress={() => router.push("/notifications")} // Shared folder!
        />
        <DashboardCard 
          title="Gallery" 
          icon="images" 
          color="#9B59B6" 
          onPress={() => router.push("/gallery")} // Shared folder!
        />
        <DashboardCard 
          title="Calendar" 
          icon="calendar" 
          color="#2ECC71" 
          onPress={() => router.push("/calendar")} // Shared folder!
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA", padding: 20 },
  header: { marginBottom: 30, marginTop: 20 },
  welcome: { fontSize: 16, color: "#666" },
  name: { fontSize: 26, fontWeight: "bold", color: "#1a1a2e" },
  roleTag: { color: "#FF4D4D", fontWeight: "bold", marginTop: 5, textTransform: "uppercase", fontSize: 12 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }
});