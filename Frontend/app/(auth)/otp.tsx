import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useUser } from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OtpScreen() {
  const { setUser } = useUser();

  const verifyOtp = async () => {
    const userData = {
      id: "1",
      name: "Test Student",
      role: "student" as "student",
    };

    setUser(userData);

    await AsyncStorage.setItem("user", JSON.stringify(userData));

    router.replace("/(drawer)/(tabs)/home");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>OTP Screen</Text>

      <TouchableOpacity onPress={verifyOtp}>
        <Text>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
}