import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function FeedbackScreen() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    console.log({
      subject,
      message,
    });

    setSubject("");
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suggestions / Feedback</Text>

      <TextInput
        placeholder="Subject"
        style={styles.input}
        value={subject}
        onChangeText={setSubject}
      />

      <TextInput
        placeholder="Write your message..."
        style={styles.textarea}
        multiline
        value={message}
        onChangeText={setMessage}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
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
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },

  textarea: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    height: 120,
    textAlignVertical: "top",
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#4F6BED",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
