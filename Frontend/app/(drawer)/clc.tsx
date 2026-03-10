import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function CLCRequest() {
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");

  const submitRequest = () => {
    if (!reason || !date) {
      alert("Please fill all fields");
      return;
    }

    const requestData = {
      reason,
      date,
    };

    console.log(requestData);

    alert("CLC Request Submitted!");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>CLC Request</Text>

      <TextInput
        placeholder="Reason for leaving"
        style={styles.input}
        value={reason}
        onChangeText={setReason}
      />

      <TextInput
        placeholder="Last Working Date"
        style={styles.input}
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity style={styles.button} onPress={submitRequest}>
        <Text style={styles.btnText}>Submit Request</Text>
      </TouchableOpacity>
    </ScrollView>
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

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },

  button: {
    backgroundColor: "#4F6BED",
    padding: 14,
    borderRadius: 10,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});