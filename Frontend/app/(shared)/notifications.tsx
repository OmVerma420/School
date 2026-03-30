import { notifications } from "@/constants/notification";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function NotificationsScreen() {
  const [filter, setFilter] = useState<"all" | "teacher" | "school">("all");
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const filteredNotifications = notifications.filter((item) => {
    const matchFilter = filter === "all" ? true : item.type === filter;

    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  return (
    <View style={styles.container}>
      {/* Search */}
      <TextInput
        placeholder="Search Notification"
        style={styles.search}
        value={search}
        onChangeText={setSearch}
      />

      {/* Filters */}
      <View style={styles.filters}>
        <FilterButton
          label="ALL"
          active={filter === "all"}
          onPress={() => setFilter("all")}
        />

        <FilterButton
          label="By Teacher"
          active={filter === "teacher"}
          onPress={() => setFilter("teacher")}
        />

        <FilterButton
          label="By School"
          active={filter === "school"}
          onPress={() => setFilter("school")}
        />
      </View>

      {/* Notification List */}
      {filteredNotifications.length === 0 ? (
        <View style={styles.empty}>
          <Text>No Notification Found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredNotifications}
          keyExtractor={(item) => item.id}
          refreshing={refreshing}
          onRefresh={onRefresh}
          renderItem={({ item }) => (
            <View style={[styles.card, !item.read && styles.unread]}>
              <View style={styles.row}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>

              <Text style={styles.badge}>
                {item.type === "teacher" ? "Teacher" : "School"}
              </Text>

              <Text>{item.message}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

function FilterButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.filterBtn, active && styles.active]}
      onPress={onPress}
    >
      <Text>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F6FA",
  },

  search: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  filters: {
    flexDirection: "row",
    marginBottom: 15,
  },

  filterBtn: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginRight: 10,
  },

  active: {
    backgroundColor: "#D6D6FF",
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  unread: {
    borderLeftWidth: 4,
    borderLeftColor: "#4F6BED",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  title: {
    fontWeight: "bold",
  },

  badge: {
    fontSize: 11,
    color: "#4F6BED",
    marginBottom: 4,
    fontWeight: "600",
  },

  time: {
    fontSize: 12,
    color: "gray",
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
