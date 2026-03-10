import { messages } from "@/constants/messages";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function MessagesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.sender}>{item.sender}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>

            <Text style={styles.messageTitle}>{item.title}</Text>
            <Text style={styles.message}>{item.message}</Text>

            {item.unread && <View style={styles.unreadDot} />}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  sender: {
    fontWeight: "bold",
  },

  time: {
    color: "#888",
  },

  messageTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },

  message: {
    color: "#555",
  },

  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "red",
    marginTop: 8,
  },
});