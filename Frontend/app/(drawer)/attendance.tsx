import { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { api } from "@/services/api";

export default function AttendanceScreen() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      const response = await api.get("/attendance/my-stats");
      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error("Stats fetch error", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4A6CF7" />
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchStats(); }} />}
    >
      <Text style={styles.title}>My Attendance</Text>

      {/* Percentage Circle Card */}
      <View style={styles.mainCard}>
        <View style={styles.percentageCircle}>
          <Text style={styles.percentageText}>{stats?.percentage}%</Text>
          <Text style={styles.subText}>Total Present</Text>
        </View>
      </View>

      {/* Detailed Stats Cards */}
      <View style={styles.statsRow}>
        <View style={[styles.statBox, { borderLeftColor: "#4A6CF7" }]}>
          <Text style={styles.statLabel}>Total</Text>
          <Text style={styles.statValue}>{stats?.total}</Text>
        </View>
        <View style={[styles.statBox, { borderLeftColor: "#2ECC71" }]}>
          <Text style={styles.statLabel}>Present</Text>
          <Text style={styles.statValue}>{stats?.present}</Text>
        </View>
        <View style={[styles.statBox, { borderLeftColor: "#FF4D4D" }]}>
          <Text style={styles.statLabel}>Absent</Text>
          <Text style={styles.statValue}>{stats?.absent}</Text>
        </View>
      </View>

      <Text style={styles.footerNote}>* Keep your attendance above 75% to avoid penalties.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA", padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#1a1a2e" },
  mainCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    elevation: 4,
    marginBottom: 20,
  },
  percentageCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 10,
    borderColor: "#4A6CF7",
    justifyContent: "center",
    alignItems: "center",
  },
  percentageText: { fontSize: 32, fontWeight: "bold", color: "#1a1a2e" },
  subText: { fontSize: 12, color: "#666" },
  statsRow: { flexDirection: "row", justifyContent: "space-between" },
  statBox: {
    backgroundColor: "#fff",
    width: "30%",
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 5,
    elevation: 2,
    alignItems: "center"
  },
  statLabel: { fontSize: 12, color: "#888", fontWeight: "600" },
  statValue: { fontSize: 18, fontWeight: "bold", color: "#333", marginTop: 5 },
  footerNote: { textAlign: "center", marginTop: 30, color: "#999", fontSize: 12, fontStyle: "italic" }
});