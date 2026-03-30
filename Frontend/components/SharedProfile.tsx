import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ScrollView, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "@/context/UserContext";
import { api } from "@/services/api";
import { router } from "expo-router";

export default function SharedProfile() {
  const { user, setUser, logout } = useUser();
  
  // Magic Check: Are they a student?
  const isStudent = user?.role === "student";

  const [isEditing, setIsEditing] = useState(!user?.isProfileComplete);
  const [isLoading, setIsLoading] = useState(false);

  // Universal Fields
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  
  // Student Only Fields
  const [fatherName, setFatherName] = useState(user?.fatherName || "");
  const [motherName, setMotherName] = useState(user?.motherName || "");
  const [dob, setDob] = useState(user?.dob || "");

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  const handleSave = async () => {
    // If student, require all fields. If faculty, only require phone & address.
    if (isStudent && (!fatherName || !motherName || !dob)) {
      Alert.alert("Missing Fields", "Students must fill out all family details.");
      return;
    }
    if (!phone || !address) {
      Alert.alert("Missing Fields", "Phone and Address are required.");
      return;
    }

    setIsLoading(true);

    try {
      // Backend handles this perfectly! It only updates the fields we send.
      const payload = isStudent 
        ? { fatherName, motherName, phone, dob, address } 
        : { phone, address }; // Faculty only sends this!

      const response = await api.put("/complete-profile", payload);

      if (response.data.success) {
        const updatedUser = { ...user, ...response.data.user };
        setUser(updatedUser); 
        await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
        
        Alert.alert("Success!", "Profile Updated Successfully.");
        setIsEditing(false); 
      }
    } catch (error) {
      Alert.alert("Error", "Could not save profile data.");
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // VIEW 1: THE FORM (EDIT MODE)
  // ==========================================
  if (isEditing) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Update Profile</Text>
          <Text style={styles.subtitle}>Please provide your details.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Phone Number *</Text>
          <TextInput style={styles.input} keyboardType="numeric" maxLength={10} value={phone} onChangeText={setPhone} />

          <Text style={styles.label}>Full Address *</Text>
          <TextInput style={[styles.input, styles.textArea]} multiline numberOfLines={3} value={address} onChangeText={setAddress} />

          {/* DYNAMICALLY HIDE THESE IF FACULTY/ADMIN */}
          {isStudent && (
            <>
              <Text style={styles.label}>Date of Birth *</Text>
              <TextInput style={styles.input} placeholder="DD/MM/YYYY" value={dob} onChangeText={setDob} />
              
              <Text style={styles.label}>Father's Name *</Text>
              <TextInput style={styles.input} value={fatherName} onChangeText={setFatherName} />

              <Text style={styles.label}>Mother's Name *</Text>
              <TextInput style={styles.input} value={motherName} onChangeText={setMotherName} />
            </>
          )}

          <TouchableOpacity style={styles.primaryButton} onPress={handleSave} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Save Profile</Text>}
          </TouchableOpacity>

          {user?.isProfileComplete && (
            <TouchableOpacity style={styles.secondaryButton} onPress={() => setIsEditing(false)}>
              <Text style={styles.secondaryButtonText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    );
  }

  // ==========================================
  // VIEW 2: THE READ-ONLY PROFILE
  // ==========================================
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{user?.name?.charAt(0).toUpperCase() || "U"}</Text>
        </View>
        <Text style={styles.name}>{user?.name || "User Name"}</Text>
        <Text style={styles.roleText}>
          {user?.role} {isStudent && `• Class ${user?.studentClass}`}
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.infoRow}><Text style={styles.infoLabel}>Email</Text><Text style={styles.infoValue}>{user?.email}</Text></View>
        <View style={styles.infoRow}><Text style={styles.infoLabel}>Phone</Text><Text style={styles.infoValue}>{user?.phone}</Text></View>
        <View style={styles.infoRow}><Text style={styles.infoLabel}>Address</Text><Text style={styles.infoValue}>{user?.address}</Text></View>
        
        {/* DYNAMICALLY HIDE THESE IF FACULTY/ADMIN */}
        {isStudent && (
          <>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>DOB</Text><Text style={styles.infoValue}>{user?.dob}</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>Father</Text><Text style={styles.infoValue}>{user?.fatherName}</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>Mother</Text><Text style={styles.infoValue}>{user?.motherName}</Text></View>
          </>
        )}
      </View>

      <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA" },
  scrollContent: { padding: 20, paddingBottom: 40 },
  header: { marginTop: 20, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#1a1a2e", marginBottom: 8 },
  subtitle: { fontSize: 15, color: "#666" },
  profileHeader: { alignItems: "center", marginBottom: 25 },
  avatarContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#4A6CF7", justifyContent: "center", alignItems: "center", marginBottom: 15 },
  avatarText: { fontSize: 32, fontWeight: "bold", color: "#fff" },
  name: { fontSize: 24, fontWeight: "bold", color: "#1a1a2e" },
  roleText: { fontSize: 15, color: "#666", marginTop: 4, textTransform: "capitalize" },
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 12, elevation: 2 },
  infoRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#F0F0F0" },
  infoLabel: { fontSize: 14, color: "#888", fontWeight: "600", width: 80 },
  infoValue: { fontSize: 15, color: "#333", flex: 1, textAlign: "right" },
  label: { fontSize: 14, fontWeight: "600", color: "#333", marginBottom: 6, marginTop: 12 },
  input: { backgroundColor: "#F9FAFC", borderWidth: 1, borderColor: "#E0E5ED", padding: 14, borderRadius: 8, fontSize: 15, color: "#333" },
  textArea: { height: 80, textAlignVertical: "top" },
  primaryButton: { backgroundColor: "#4A6CF7", padding: 16, borderRadius: 8, alignItems: "center", marginTop: 25 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  secondaryButton: { backgroundColor: "transparent", padding: 16, borderRadius: 8, alignItems: "center", marginTop: 10 },
  secondaryButtonText: { color: "#666", fontSize: 16, fontWeight: "bold" },
  editButton: { backgroundColor: "#E6F4FE", padding: 16, borderRadius: 8, alignItems: "center", marginTop: 20 },
  editButtonText: { color: "#4A6CF7", fontSize: 16, fontWeight: "bold" },
  logoutButton: { backgroundColor: "#FF4D4D", padding: 16, borderRadius: 8, alignItems: "center", marginTop: 15 },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" }
});