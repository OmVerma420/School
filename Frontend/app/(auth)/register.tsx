import { router } from "expo-router";
import { useState } from "react";
import {
  StyleSheet, Text, TextInput, TouchableOpacity,
  View, Alert, ActivityIndicator, ScrollView
} from "react-native";
import { api } from "@/services/api";
import axios from "axios";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !studentClass.trim()) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    setIsLoading(true);

    try {
      await api.post("/auth/register", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        studentClass: studentClass.trim(), 
      });

      router.replace({
        pathname: "/(auth)/otp",
        params: { email: email.trim().toLowerCase() },
      });

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message || "Registration failed";
        Alert.alert("Registration Failed", msg);
      } else {
        Alert.alert("Error", "An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Text style={styles.title}>Student Registration</Text>
        <Text style={styles.subtitle}>Create your school account</Text>

        <TextInput
          placeholder="Full Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Class (e.g., 10A)"
          style={styles.input}
          value={studentClass}
          onChangeText={setStudentClass}
          autoCapitalize="characters"
        />

        <TextInput
          placeholder="Email Address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[styles.button, isLoading && { opacity: 0.6 }]}
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>REGISTER</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back to Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: "#F5F6FA" },
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 8, textAlign: "center", color: "#1a1a2e" },
  subtitle: { fontSize: 14, color: "#666", textAlign: "center", marginBottom: 30 },
  input: {
    backgroundColor: "#fff", padding: 15, borderRadius: 8,
    marginBottom: 15, borderWidth: 1, borderColor: "#e0e0e0", fontSize: 15,
  },
  button: { backgroundColor: "#4A6CF7", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  backBtn: { marginTop: 20, alignItems: "center" },
  backText: { color: "#666", fontSize: 14 },
});