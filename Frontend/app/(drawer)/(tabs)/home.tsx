import DashboardCard from "@/components/DashboardCard";
import { dashboardItems } from "@/constants/dashboardItems";
import { router } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={dashboardItems}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DashboardCard
            title={item.title}
            icon={item.icon}
            color={item.color}
            onPress={() => router.push(item.route)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F5F6FA",
  },
});
