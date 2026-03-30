import { Stack } from "expo-router";

export default function SharedLayout() {
  return (
    <Stack>
      {/* This automatically gives all shared screens a nice header with a back button! */}
      <Stack.Screen name="notifications" options={{ title: "Notices" }} />
      <Stack.Screen name="calendar" options={{ title: "School Calendar" }} />
      <Stack.Screen name="gallery" options={{ title: "Gallery" }} />
      <Stack.Screen name="feedback" options={{ title: "Feedback" }} />
      <Stack.Screen name="clc" options={{ title: "CLC Request" }} />
    </Stack>
  );
}