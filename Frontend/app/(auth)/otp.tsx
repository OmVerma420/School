import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Text, TouchableOpacity, View, TextInput,
  StyleSheet, Alert, ActivityIndicator,
} from "react-native";
import { useUser } from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "@/services/api";
import axios from "axios";

export default function OtpScreen() {
  const { setUser } = useUser();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const verifyOtp = async () => {
    if (!otp.trim()) {
      Alert.alert("Error", "Please enter the OTP");
      return;
    }

    setIsLoading(true);

    try {
      // Calls: POST http://YOUR_IP:5000/api/auth/verify-otp
      // Backend reads: { email, otp }
      // Backend returns: { success, token, user: { id, name, role } }
      const res = await api.post("/auth/verify-otp", { email, otp });

      const { token, user } = res.data;

      // Persist session
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      // Update context → AuthGate in _layout.tsx detects user is now set
      // and the useSegments check will keep them on /(drawer) screens
      setUser(user);

      router.replace("/(drawer)/(tabs)/home");

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message || "Invalid OTP. Please try again.";
        Alert.alert("Verification Failed", msg);
        console.log("❌ OTP error:", error.response?.data);
      } else {
        Alert.alert("Error", "Something went wrong");
        console.log("❌ Error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>
        Check your backend terminal for the OTP
      </Text>
      <Text style={styles.emailText}>{email}</Text>

      <TextInput
        placeholder="Enter OTP"
        style={styles.input}
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        maxLength={6}
      />

      <TouchableOpacity
        style={[styles.button, isLoading && { opacity: 0.6 }]}
        onPress={verifyOtp}
        disabled={isLoading}
      >
        {isLoading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.buttonText}>Verify OTP</Text>
        }
      </TouchableOpacity>

      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#F5F6FA" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8, textAlign: "center", color: "#1a1a2e" },
  subtitle: { fontSize: 13, color: "#666", textAlign: "center", marginBottom: 6 },
  emailText: { fontSize: 14, color: "#4A6CF7", textAlign: "center", fontWeight: "600", marginBottom: 28 },
  input: {
    backgroundColor: "#fff", padding: 15, borderRadius: 8,
    marginBottom: 15, borderWidth: 1, borderColor: "#e0e0e0",
    fontSize: 24, textAlign: "center", letterSpacing: 10,
  },
  button: { backgroundColor: "#4A6CF7", padding: 15, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  backBtn: { marginTop: 16, alignItems: "center" },
  backText: { color: "#666", fontSize: 14 },
});