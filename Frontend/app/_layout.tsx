import { UserProvider } from "@/context/UserContext";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

// 1. Tell the splash screen to stay visible
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  useEffect(() => {
    // 2. Create a timer to hide the splash screen after 2.5 seconds
    const timer = setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* 3. Keep your explicit routing structure here! */}
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(drawer)" />
      </Stack>
    </UserProvider>
  );
}