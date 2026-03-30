import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function FacultyLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#FF4D4D" }}> {/* Red theme for Faculty! */}
      
      {/* Tab 1: Dashboard */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />

      {/* Tab 2: Create Assignment */}
      <Tabs.Screen
        name="create-assignment"
        options={{
          title: "Create",
          tabBarIcon: ({ color }) => <Ionicons name="add-circle" size={24} color={color} />,
        }}
      />

      {/* Tab 3: Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />
      
    </Tabs>
  );
}