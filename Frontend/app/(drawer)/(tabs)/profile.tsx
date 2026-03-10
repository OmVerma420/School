import { useUser } from "@/context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileScreen = () => {
  const { user, setUser } = useUser();

  const logout = async () => {
    await AsyncStorage.removeItem("user");

    setUser(null);

    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150" }}
          style={styles.avatar}
        />

        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.role}>{user?.role}</Text>
      </View>

      {/* Academic Info */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Academic Information</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Class:</Text>
          <Text style={styles.value}>10</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Section:</Text>
          <Text style={styles.value}>A</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Admission No:</Text>
          <Text style={styles.value}>ST12345</Text>
        </View>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    padding: 20,
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
  },

  role: {
    color: "#666",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    marginBottom: 30,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  label: {
    color: "#555",
  },

  value: {
    fontWeight: "600",
  },

  logoutBtn: {
    backgroundColor: "#E74C3C",
    padding: 14,
    borderRadius: 10,
  },

  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});