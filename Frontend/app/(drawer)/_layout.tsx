import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen name="(tabs)" options={{ title: "Dashboard" }} />

      <Drawer.Screen name="attendance" options={{ title: "Attendance" }} />

      <Drawer.Screen
        name="study-material"
        options={{ title: "Study Material" }}
      />

      <Drawer.Screen name="calendar" options={{ title: "Calendar" }} />
      <Drawer.Screen name="messages" options={{ title: "Messages" }} />
      <Drawer.Screen name="assignments" options={{ title: "Assignments" }} />
      <Drawer.Screen name="gallery" options={{ title: "Gallery" }} />
      <Drawer.Screen name="timetable" options={{ title: "Timetable" }} />
      <Drawer.Screen name="feedback" options={{ title: "Feedback" }} />
    </Drawer>
  );
}
