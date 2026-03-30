import { Redirect } from "expo-router";
import { useUser } from "@/context/UserContext";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const { user, loading } = useUser();

  // 1. Show the spinner ONLY while checking AsyncStorage
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F5F6FA" }}>
        <ActivityIndicator size="large" color="#4A6CF7" />
      </View>
    );
  }

  // 2. If the student is already logged in, send them to the Dashboard
  if (user) {
    // If they are faculty or admin, send them to a dedicated faculty dashboard
    if (user.role === "faculty" || user.role === "admin") {
      return <Redirect href="/(faculty)" />; 
    }
    
    // Otherwise, they are a student, send them to the student dashboard
    return <Redirect href="/(drawer)" />; 
  }

  // 3. If they are not logged in, send them to the Login screen
  return <Redirect href="/(auth)/login" />;
}