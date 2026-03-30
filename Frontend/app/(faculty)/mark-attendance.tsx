import { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { api } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";

export default function MarkAttendance() {
  const [className, setClassName] = useState("10A"); // You can add a picker later
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Track attendance locally: { "studentId": "Present" | "Absent" }
  const [attendanceState, setAttendanceState] = useState<any>({});

  useEffect(() => {
    fetchStudents();
  }, [className]);

  const fetchStudents = async () => {
    try {
      const response = await api.get(`/attendance/students/${className}`);
      if (response.data.success) {
        setStudents(response.data.students);
        // Initialize everyone as Present
        const initialState: any = {};
        response.data.students.forEach((s: any) => initialState[s._id] = "Present");
        setAttendanceState(initialState);
      }
    } catch (error) {
      Alert.alert("Error", "Could not load students");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = (id: string) => {
    setAttendanceState((prev: any) => ({
      ...prev,
      [id]: prev[id] === "Present" ? "Absent" : "Present"
    }));
  };

  const submitAttendance = async () => {
    setSaving(true);
    try {
      const attendanceData = Object.keys(attendanceState).map(id => ({
        studentId: id,
        status: attendanceState[id]
      }));

      await api.post("/attendance/mark", {
        attendanceData,
        date: new Date().toISOString().split('T')[0], // Today's date YYYY-MM-DD
        studentClass: className
      });

      Alert.alert("Success", "Attendance Saved!");
    } catch (error) {
      Alert.alert("Error", "Failed to save attendance");
    } finally {
      setSaving(false);
    }
  };

  const renderStudent = ({ item }: any) => {
    const isPresent = attendanceState[item._id] === "Present";
    return (
      <View style={styles.studentCard}>
        <Text style={styles.studentName}>{item.name}</Text>
        <TouchableOpacity 
          style={[styles.statusBtn, isPresent ? styles.presentBtn : styles.absentBtn]}
          onPress={() => toggleStatus(item._id)}
        >
          <Text style={styles.statusText}>{attendanceState[item._id]}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Attendance: Class {className}</Text>
        <Text style={styles.date}>{new Date().toDateString()}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#FF4D4D" />
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item) => item._id}
          renderItem={renderStudent}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      <TouchableOpacity 
        style={styles.saveBtn} 
        onPress={submitAttendance}
        disabled={saving}
      >
        {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveText}>Submit Attendance</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA", padding: 20 },
  header: { marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "#1a1a2e" },
  date: { color: "#666", marginTop: 4 },
  studentCard: { backgroundColor: "#fff", padding: 15, borderRadius: 12, marginBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", elevation: 1 },
  studentName: { fontSize: 16, fontWeight: "600", color: "#333" },
  statusBtn: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 8, minWidth: 100, alignItems: "center" },
  presentBtn: { backgroundColor: "#D4EFDF" },
  absentBtn: { backgroundColor: "#FADBD8" },
  statusText: { fontWeight: "bold", fontSize: 13 },
  saveBtn: { position: "absolute", bottom: 20, left: 20, right: 20, backgroundColor: "#FF4D4D", padding: 18, borderRadius: 12, alignItems: "center", elevation: 5 },
  saveText: { color: "#fff", fontWeight: "bold", fontSize: 16 }
});