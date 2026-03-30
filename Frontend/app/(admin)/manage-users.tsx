import { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { api } from "@/services/api";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("student"); // student or faculty

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/users");
      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      Alert.alert("Error", "Could not fetch users");
    } finally {
      setLoading(false);
    }
  };

  const renderUser = ({ item }: any) => (
    <View style={styles.userCard}>
      <View>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <Text style={styles.userSubText}>
          {item.role === "student" ? `Class: ${item.studentClass}` : "Faculty Member"}
        </Text>
      </View>
      <View style={[styles.statusBadge, item.isProfileComplete ? styles.bgSuccess : styles.bgWarning]}>
        <Text style={styles.statusText}>{item.isProfileComplete ? "Verified" : "Pending"}</Text>
      </View>
    </View>
  );

  const filteredUsers = users.filter((u: any) => u.role === filter);

  return (
    <View style={styles.container}>
      {/* Role Switcher */}
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, filter === "student" && styles.activeTab]} 
          onPress={() => setFilter("student")}
        >
          <Text style={[styles.tabText, filter === "student" && styles.activeTabText]}>Students</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, filter === "faculty" && styles.activeTab]} 
          onPress={() => setFilter("faculty")}
        >
          <Text style={[styles.tabText, filter === "faculty" && styles.activeTabText]}>Faculty</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2C3E50" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item: any) => item._id}
          renderItem={renderUser}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={<Text style={styles.emptyText}>No {filter}s found.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA", padding: 20 },
  tabBar: { flexDirection: "row", backgroundColor: "#fff", borderRadius: 10, marginBottom: 20, padding: 5 },
  tab: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 8 },
  activeTab: { backgroundColor: "#2C3E50" },
  tabText: { fontWeight: "600", color: "#666" },
  activeTabText: { color: "#fff" },
  userCard: { backgroundColor: "#fff", padding: 15, borderRadius: 12, marginBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", elevation: 1 },
  userName: { fontSize: 16, fontWeight: "bold", color: "#333" },
  userEmail: { fontSize: 13, color: "#666" },
  userSubText: { fontSize: 12, color: "#999", marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  bgSuccess: { backgroundColor: "#D4EFDF" },
  bgWarning: { backgroundColor: "#FCF3CF" },
  statusText: { fontSize: 11, fontWeight: "bold" },
  emptyText: { textAlign: "center", marginTop: 50, color: "#999" }
});