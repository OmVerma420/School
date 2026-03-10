import { UserProvider, useUser } from "../context/UserContext";
import { Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

/**
 * Load user from AsyncStorage when app starts
 */
function InitUser() {
  const { setUser } = useUser();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log("Failed to load user:", error);
      }
    };

    loadUser();
  }, []);

  return null;
}

export default function RootLayout() {
  return (
    <UserProvider>
      <InitUser />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(drawer)" />
        <Stack.Screen name="index" />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>

    </UserProvider>
  );
}