import * as DocumentPicker from "expo-document-picker";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AssignmentDetailScreen() {
  const { id } = useLocalSearchParams();

  const [fileName, setFileName] = useState<string | null>(null);

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
    });

    if (!result.canceled) {
      setFileName(result.assets[0].name);
    }
  };

  const submitAssignment = () => {
    if (!fileName) {
      alert("Please upload a file first");
      return;
    }

    alert("Assignment Submitted Successfully!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assignment #{id}</Text>

      <Text style={styles.description}>
        Submit your homework before the due date.
      </Text>

      <TouchableOpacity style={styles.uploadBtn} onPress={pickFile}>
        <Text style={styles.btnText}>Upload File</Text>
      </TouchableOpacity>

      {fileName && (
        <Text style={styles.fileName}>Selected File: {fileName}</Text>
      )}

      <TouchableOpacity style={styles.submitBtn} onPress={submitAssignment}>
        <Text style={styles.btnText}>Submit Assignment</Text>
      </TouchableOpacity>
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
    marginBottom: 10,
  },

  description: {
    marginBottom: 20,
    color: "#555",
  },

  uploadBtn: {
    backgroundColor: "#4F6BED",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },

  submitBtn: {
    backgroundColor: "#2ECC71",
    padding: 12,
    borderRadius: 10,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },

  fileName: {
    marginBottom: 15,
    color: "#333",
  },
});
