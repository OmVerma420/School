import { Drawer } from "expo-router/drawer";
import { useUser } from "@/context/UserContext";

export default function DrawerLayout() {
  const { user } = useUser();

  return (
    <Drawer>
      <Drawer.Screen name="(tabs)" options={{ title: "Dashboard" }} />

      <Drawer.Screen name="attendance" options={{ title: "Attendance" }} />

      <Drawer.Screen
        name="study-material"
        options={{ title: "Study Material" }}
      />

      <Drawer.Screen name="calendar" options={{ title: "Calendar" }} />
      
      <Drawer.Screen name="assignments" options={{ title: "Assignments" }} />
      
      <Drawer.Screen name="gallery" options={{ title: "Gallery" }} />
      
      <Drawer.Screen name="timetable" options={{ title: "Timetable" }} />
      
      <Drawer.Screen name="feedback" options={{ title: "Feedback" }} />

      {/* ========================================== */}
      {/* HIDDEN SCREENS (Accessible via navigation, but hidden from Drawer menu) */}
      {/* ========================================== */}
      
      <Drawer.Screen 
        name="assignment-detail" 
        options={{ 
          title: "Assignment Details",
          drawerItemStyle: { display: "none" } 
        }} 
      />

      <Drawer.Screen 
        name="absent-info" 
        options={{ 
          title: "Absent Info",
          drawerItemStyle: { display: "none" } 
        }} 
      />

      <Drawer.Screen 
        name="clc" 
        options={{ 
          title: "CLC Request",
          drawerItemStyle: { display: "none" } // Hiding this one-time form from the main menu
        }} 
      />

      {/* The deleted screens (messages, online-admission) should NOT be listed here at all */}
    </Drawer>
  );
}