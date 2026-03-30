import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ScrollView, Alert, ActivityIndicator } from "react-native";
import { useUser } from "@/context/UserContext";
import { api } from "@/services/api";

export default function AdmissionsScreen() {
  const { user } = useUser();
  const isAdmin = user?.role === "admin";

  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State for Students
  const [formData, setFormData] = useState({
    studentName: "", fatherName: "", motherName: "", 
    classApplying: "", dob: "", phone: "", address: ""
  });

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    try {
      const endpoint = isAdmin ? "/admissions/all" : "/admissions/my";
      const response = await api.get(endpoint);
      if (response.data.success) setAdmissions(response.data.admissions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.studentName || !formData.phone) return Alert.alert("Error", "Fill required fields");
    try {
      const response = await api.post("/admissions", formData);
      if (response.data.success) {
        Alert.alert("Success", "Form submitted successfully!");
        fetchAdmissions();
      }
    } catch (error) {
      Alert.alert("Error", "Submission failed");
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.put(`/admissions/${id}/status`, { status });
      Alert.alert("Status Updated", `Form marked as ${status}`);
      fetchAdmissions();
    } catch (error) {
      Alert.alert("Error", "Update failed");
    }
  };

  // --- VIEW 1: ADMIN LIST ---
  if (isAdmin) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>All Applications</Text>
        <FlatList
          data={admissions}
          keyExtractor={(item: any) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.studentName}</Text>
              <Text>Class: {item.classApplying} | Parent: {item.fatherName}</Text>
              <Text style={[styles.status, { color: item.status === 'Approved' ? 'green' : 'orange' }]}>
                Status: {item.status || "Pending"}
              </Text>
              <View style={styles.row}>
                <TouchableOpacity style={styles.approveBtn} onPress={() => updateStatus(item._id, "Approved")}>
                  <Text style={styles.btnText}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rejectBtn} onPress={() => updateStatus(item._id, "Rejected")}>
                  <Text style={styles.btnText}>Reject</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    );
  }

  // --- VIEW 2: STUDENT FORM & STATUS ---
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Admission Form</Text>
      
      {/* Show existing application status if available */}
      {admissions.length > 0 && (
        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>Your Latest Application Status:</Text>
          <Text style={styles.statusValue}>{admissions[0].status || "Pending Review"}</Text>
        </View>
      )}

      <View style={styles.formCard}>
        <TextInput placeholder="Student Name" style={styles.input} onChangeText={(t) => setFormData({...formData, studentName: t})} />
        <TextInput placeholder="Father's Name" style={styles.input} onChangeText={(t) => setFormData({...formData, fatherName: t})} />
        <TextInput placeholder="Class Applying For" style={styles.input} onChangeText={(t) => setFormData({...formData, classApplying: t})} />
        <TextInput placeholder="Phone Number" style={styles.input} keyboardType="phone-pad" onChangeText={(t) => setFormData({...formData, phone: t})} />
        <TextInput placeholder="Full Address" style={[styles.input, { height: 80 }]} multiline onChangeText={(t) => setFormData({...formData, address: t})} />
        
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Submit Admission</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  card: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 15, elevation: 2 },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  status: { fontWeight: "bold", marginVertical: 5 },
  row: { flexDirection: "row", marginTop: 10 },
  approveBtn: { backgroundColor: "#2ecc71", padding: 10, borderRadius: 5, marginRight: 10 },
  rejectBtn: { backgroundColor: "#e74c3c", padding: 10, borderRadius: 5 },
  formCard: { backgroundColor: "#fff", padding: 15, borderRadius: 10 },
  input: { borderBottomWidth: 1, borderColor: "#ddd", marginBottom: 15, padding: 8 },
  submitBtn: { backgroundColor: "#4A6CF7", padding: 15, borderRadius: 8, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "bold" },
  statusCard: { backgroundColor: "#E6F4FE", padding: 15, borderRadius: 10, marginBottom: 20, borderLeftWidth: 5, borderLeftColor: "#4A6CF7" },
  statusLabel: { fontSize: 12, color: "#666" },
  statusValue: { fontSize: 18, fontWeight: "bold", color: "#4A6CF7" }
});