import { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useUser } from "@/context/UserContext"; // To check role
import { api } from "@/services/api"; // Your axios instance

export default function NotificationsScreen() {
  const { user } = useUser();
  const isAdmin = user?.role === "admin";

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Admin Form State
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState<"all" | "student" | "faculty">("all");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await api.get("/notifications");
      if (response.data.success) {
        setNotifications(response.data.notifications);
      }
    } catch (error) {
      console.error("Fetch error", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handlePostNotice = async () => {
    if (!title || !message) return Alert.alert("Error", "Fill all fields");

    try {
      const response = await api.post("/notifications", {
        title,
        message,
        targetAudience: target,
      });
      if (response.data.success) {
        Alert.alert("Success", "Notice Published");
        setTitle("");
        setMessage("");
        setShowForm(false);
        fetchNotifications(); // Refresh list
      }
    } catch (error) {
      Alert.alert("Error", "Failed to post");
    }
  };

  return (
    <View style={styles.container}>
      {/* --- ADMIN ONLY SECTION --- */}
      {isAdmin && (
        <View style={styles.adminBox}>
          <TouchableOpacity 
            style={styles.postBtn} 
            onPress={() => setShowForm(!showForm)}
          >
            <Text style={styles.postBtnText}>{showForm ? "Close Form" : "+ Create New Notice"}</Text>
          </TouchableOpacity>

          {showForm && (
            <View style={styles.form}>
              <TextInput 
                placeholder="Notice Title" 
                style={styles.input} 
                value={title} 
                onChangeText={setTitle} 
              />
              <TextInput 
                placeholder="Details..." 
                style={[styles.input, { height: 80 }]} 
                multiline 
                value={message} 
                onChangeText={setMessage} 
              />
              <TouchableOpacity style={styles.submitBtn} onPress={handlePostNotice}>
                <Text style={styles.submitText}>Publish to Everyone</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {/* --- NOTIFICATION LIST --- */}
      {loading ? (
        <ActivityIndicator size="large" color="#4F6BED" />
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item: any) => item._id}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            fetchNotifications();
          }}
          ListEmptyComponent={<View style={styles.empty}><Text>No Notices Yet</Text></View>}
          renderItem={({ item }: any) => (
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.time}>{new Date(item.createdAt).toLocaleDateString()}</Text>
              </View>
              <Text style={styles.badge}>{item.targetAudience.toUpperCase()}</Text>
              <Text style={styles.msg}>{item.message}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

// Add these to your existing styles
const styles = StyleSheet.create({
  // ... keep your existing styles ...
  adminBox: { marginBottom: 20 },
  postBtn: { backgroundColor: "#1a1a2e", padding: 15, borderRadius: 10, alignItems: "center" },
  postBtnText: { color: "#fff", fontWeight: "bold" },
  form: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginTop: 10, elevation: 3 },
  input: { borderBottomWidth: 1, borderColor: "#eee", marginBottom: 10, padding: 8 },
  submitBtn: { backgroundColor: "#2ecc71", padding: 12, borderRadius: 8, alignItems: "center" },
  submitText: { color: "#fff", fontWeight: "bold" },
  container: { flex: 1, padding: 20, backgroundColor: "#F5F6FA" },
  card: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  title: { fontWeight: "bold", fontSize: 16 },
  time: { fontSize: 12, color: "gray" },
  badge: { fontSize: 11, color: "#4F6BED", fontWeight: "bold", marginBottom: 5 },
  msg: { color: "#444", lineHeight: 20 },
  empty: { alignItems: 'center', marginTop: 50 }
});