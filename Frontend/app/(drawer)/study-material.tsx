import { studyMaterials } from "@/constants/studymaterial";
import { router } from "expo-router";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useEffect, useState } from "react";

export default function StudyMaterialScreen() {

  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = async () => {
    setLoading(true);

    // simulate API delay
    setTimeout(() => {
      setMaterials(studyMaterials);
      setLoading(false);
    }, 1000);
  };

  const onRefresh = async () => {
    setRefreshing(true);

    setTimeout(() => {
      setMaterials(studyMaterials);
      setRefreshing(false);
    }, 1000);
  };

  const downloadFile = async (url: string, fileName: string) => {
    Alert.alert("Download", `Preparing to download: ${fileName}`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "View Instead",
        onPress: () => {
          router.push({
            pathname: "/(drawer)/study-material-viewer",
            params: { url },
          });
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading Study Materials...</Text>
      </View>
    );
  }

  if (materials.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No Study Material Available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Study Material</Text>

      <FlatList
        data={materials}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.subject}>{item.subject}</Text>
            <Text>{item.title}</Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.viewBtn}
                onPress={() =>
                  router.push({
                    pathname: "/(drawer)/study-material-viewer",
                    params: { url: item.fileUrl },
                  })
                }
              >
                <Text style={styles.btnText}>View</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.downloadBtn}
                onPress={() => downloadFile(item.fileUrl, item.subject)}
              >
                <Text style={styles.btnText}>Download</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F6FA",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },

  subject: {
    fontWeight: "bold",
    marginBottom: 5,
  },

  actions: {
    flexDirection: "row",
    marginTop: 10,
  },

  viewBtn: {
    backgroundColor: "#4F6BED",
    padding: 10,
    borderRadius: 6,
    marginRight: 10,
  },

  downloadBtn: {
    backgroundColor: "#2ECC71",
    padding: 10,
    borderRadius: 6,
  },

  btnText: {
    color: "#fff",
    fontWeight: "600",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

});