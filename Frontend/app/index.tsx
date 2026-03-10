import { useEffect } from "react";
import { router } from "expo-router";
import { useUser } from "../context/UserContext";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      router.replace("/(drawer)/(tabs)/home");
    } else {
      router.replace("/(auth)/login");
    }
  }, [user]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}