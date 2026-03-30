import { useState } from "react";
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  ScrollView, Alert, ActivityIndicator, Image 
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { api } from "@/services/api";
import { router } from "expo-router";

export default function CreateAssignment() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [targetClass, setTargetClass] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // --- 📸 CAMERA/GALLERY LOGIC ---
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // COMPRESS BEFORE UPLOAD
      const compressed = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 1080 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      setSelectedFile({
        uri: compressed.uri,
        name: `photo_${Date.now()}.jpg`,
        type: 'image/jpeg'
      });
    }
  };

  // --- 📎 PDF LOGIC ---
  const pickPDF = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: "application/pdf" });
    if (!result.canceled) {
      setSelectedFile({
        uri: result.assets[0].uri,
        name: result.assets[0].name,
        type: 'application/pdf'
      });
    }
  };

  // --- 🚀 SUBMIT TO BACKEND ---
  const handleSubmit = async () => {
    if (!title || !subject || !targetClass || !dueDate) {
      Alert.alert("Missing Data", "Please fill required fields (*)");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subject", subject);
    formData.append("targetClass", targetClass);
    formData.append("description", description);
    formData.append("dueDate", dueDate);

    if (selectedFile) {
      // @ts-ignore (React Native requires this object format for Multer)
      formData.append("file", {
        uri: selectedFile.uri,
        name: selectedFile.name,
        type: selectedFile.type,
      });
    }

    setLoading(true);
    try {
      const response = await api.post("/assignments", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        Alert.alert("Success", "Assignment Uploaded!");
        router.back();
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || "Upload Failed";
      Alert.alert("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.label}>Assignment Title *</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="E.g. Algebra Worksheet" />

      <View style={styles.row}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={styles.label}>Subject *</Text>
          <TextInput style={styles.input} value={subject} onChangeText={setSubject} placeholder="Maths" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Class *</Text>
          <TextInput style={styles.input} value={targetClass} onChangeText={setTargetClass} placeholder="10A" />
        </View>
      </View>

      <Text style={styles.label}>Due Date *</Text>
      <TextInput style={styles.input} value={dueDate} onChangeText={setDueDate} placeholder="YYYY-MM-DD" />

      <Text style={styles.label}>Instructions</Text>
      <TextInput style={[styles.input, styles.textArea]} multiline numberOfLines={4} value={description} onChangeText={setDescription} placeholder="Write instructions here..." />

      <Text style={styles.label}>Attachments</Text>
      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.attachBtn} onPress={pickImage}>
          <Text style={styles.attachBtnText}>📷 Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.attachBtn} onPress={pickPDF}>
          <Text style={styles.attachBtnText}>📄 PDF</Text>
        </TouchableOpacity>
      </View>

      {selectedFile && (
        <View style={styles.previewContainer}>
          <Text style={styles.fileLabel}>Selected: {selectedFile.name}</Text>
          {selectedFile.type.includes('image') && (
            <Image source={{ uri: selectedFile.uri }} style={styles.previewImg} />
          )}
        </View>
      )}

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>Publish Assignment</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  label: { fontSize: 14, fontWeight: "bold", color: "#333", marginBottom: 5, marginTop: 15 },
  input: { backgroundColor: "#F9FAFC", borderWidth: 1, borderColor: "#E0E5ED", padding: 12, borderRadius: 8 },
  row: { flexDirection: "row" },
  textArea: { height: 100, textAlignVertical: "top" },
  btnRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  attachBtn: { flex: 0.48, backgroundColor: "#F0F0F0", padding: 15, borderRadius: 8, alignItems: "center", borderWidth: 1, borderColor: "#DDD", borderStyle: "dashed" },
  attachBtnText: { fontWeight: "600", color: "#555" },
  previewContainer: { marginTop: 15, padding: 10, backgroundColor: "#F5F6FA", borderRadius: 8 },
  fileLabel: { fontSize: 12, color: "#666", marginBottom: 5 },
  previewImg: { width: 100, height: 100, borderRadius: 8 },
  submitBtn: { backgroundColor: "#FF4D4D", padding: 16, borderRadius: 8, alignItems: "center", marginTop: 30 },
  submitText: { color: "#fff", fontWeight: "bold", fontSize: 16 }
});