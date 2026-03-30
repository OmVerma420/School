import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useUser } from "@/context/UserContext";
import DashboardCard from "@/components/DashboardCard";
import { router } from "expo-router";

export default function AdminDashboard() {
  const { user } = useUser();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Control Panel</Text>
        <Text style={styles.name}>Admin: {user?.name}</Text>
      </View>

      <View style={styles.grid}>
        <DashboardCard 
          title="User Management" 
          icon="people" 
          color="#2C3E50" 
          onPress={() => router.push("/(admin)/manage-users")} 
        />
        <DashboardCard 
          title="Push Notice" 
          icon="notifications" 
          color="#E67E22" 
          onPress={() => router.push("/(shared)/notifications")} 
        />
        <DashboardCard 
          title="Admissions" 
          icon="document-text" 
          color="#27AE60" 
          onPress={() => router.push("/(shared)/admissions")} 
        />
        <DashboardCard 
          title="Gallery" 
          icon="images" 
          color="#9B59B6" 
          onPress={() => router.push("/(shared)/gallery")} 
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
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }
});