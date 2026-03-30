import { router } from "expo-router";
import { useState } from "react";
import {
  StyleSheet, Text, TextInput, TouchableOpacity,
  View, Alert, ActivityIndicator, ImageBackground
} from "react-native";
import { api } from "@/services/api";
import axios from "axios";

export default function LoginScreen() {
  // Toggle State: "student" or "faculty"
  const [selectedRole, setSelectedRole] = useState<"student" | "faculty">("student");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email: email.trim().toLowerCase(),
        password,
      });

      // Send them to OTP screen to verify
      router.push({
        pathname: "/(auth)/otp",
        params: { email: email.trim().toLowerCase() },
      });

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message || "Login failed";
        Alert.alert("Login Failed", msg);
      } else {
        Alert.alert("Error", "An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart School App</Text>

      {/* ========================================== */}
      {/* THE TOGGLE SWITCH (Just like your image!) */}
      {/* ========================================== */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity 
          style={[styles.toggleTab, selectedRole === "faculty" && styles.activeTabFaculty]}
          onPress={() => setSelectedRole("faculty")}
        >
          <Text style={[styles.toggleText, selectedRole === "faculty" && styles.activeText]}>
            Faculty / Admin
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.toggleTab, selectedRole === "student" && styles.activeTabStudent]}
          onPress={() => setSelectedRole("student")}
        >
          <Text style={[styles.toggleText, selectedRole === "student" && styles.activeText]}>
            Student
          </Text>
        </TouchableOpacity>
      </View>

      {/* Inputs */}
      <TextInput
        placeholder="Enter Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Enter Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[
          styles.button, 
          // Make the button red for Faculty, Blue for Students!
          selectedRole === "faculty" ? { backgroundColor: "#FF4D4D" } : { backgroundColor: "#4A6CF7" },
          isLoading && { opacity: 0.6 }
        ]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.buttonText}>SIGN IN</Text>
        }
      </TouchableOpacity>

      {/* ========================================== */}
      {/* ONLY SHOW REGISTER IF 'STUDENT' IS SELECTED */}
      {/* ========================================== */}
      {selectedRole === "student" && (
        <TouchableOpacity 
          style={styles.registerLink} 
          onPress={() => router.push("/(auth)/register")}
        >
          <Text style={styles.registerText}>
            Don't have an account? <Text style={styles.registerTextBold}>Register</Text>
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#F5F6FA" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 30, textAlign: "center", color: "#1a1a2e" },
  
  // Toggle Styles
  toggleContainer: { flexDirection: "row", backgroundColor: "#fff", borderRadius: 8, marginBottom: 25, elevation: 2, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 3, shadowOffset: { width: 0, height: 1 } },
  toggleTab: { flex: 1, paddingVertical: 15, alignItems: "center", borderRadius: 8 },
  activeTabFaculty: { backgroundColor: "#FF4D4D" }, // Red for faculty
  activeTabStudent: { backgroundColor: "#4A6CF7" }, // Blue for student
  toggleText: { fontSize: 15, fontWeight: "600", color: "#666" },
  activeText: { color: "#fff" },

  input: { backgroundColor: "#fff", padding: 15, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: "#e0e0e0", fontSize: 15 },
  button: { padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  registerLink: { marginTop: 25, alignItems: "center" },
  registerText: { color: "#666", fontSize: 14 },
  registerTextBold: { color: "#4A6CF7", fontWeight: "bold" },
});