import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  title: string;
  icon: any;
  color: string;
  onPress?: () => void;
};

const DashboardCard = ({ title, icon, color, onPress }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={28} color="#fff" />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default DashboardCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 110,
    margin: 8,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  text: {
    color: "#fff",
    marginTop: 8,
    fontWeight: "600",
  },
});
