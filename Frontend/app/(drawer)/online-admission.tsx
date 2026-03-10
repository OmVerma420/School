import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function OnlineAdmission() {
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [className, setClassName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const submitForm = () => {
    if (!name || !fatherName || !className || !phone) {
      alert("Please fill all required fields");
      return;
    }

    const formData = {
      name,
      fatherName,
      motherName,
      className,
      dob,
      phone,
      address,
    };

    console.log(formData);

    alert("Admission Application Submitted!");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Online Admission</Text>

      <TextInput
        placeholder="Student Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Father Name"
        style={styles.input}
        value={fatherName}
        onChangeText={setFatherName}
      />

      <TextInput
        placeholder="Mother Name"
        style={styles.input}
        value={motherName}
        onChangeText={setMotherName}
      />

      <TextInput
        placeholder="Class Applying For"
        style={styles.input}
        value={className}
        onChangeText={setClassName}
      />

      <TextInput
        placeholder="Date of Birth (DD/MM/YYYY)"
        style={styles.input}
        value={dob}
        onChangeText={setDob}
      />

      <TextInput
        placeholder="Phone Number"
        keyboardType="phone-pad"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        placeholder="Address"
        style={[styles.input, { height: 80 }]}
        multiline
        value={address}
        onChangeText={setAddress}
      />

      <TouchableOpacity style={styles.button} onPress={submitForm}>
        <Text style={styles.btnText}>Submit Application</Text>
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
    marginTop: 10,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});