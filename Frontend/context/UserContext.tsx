import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: string;
  name: string;
  email: string;
  role: "student" | "faculty" | "admin";
  studentClass?: string;
  fatherName?: string;
  motherName?: string;
  phone?: string;
  dob?: string;
  address?: string;
  isProfileComplete?: boolean;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  logout: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restore = async () => {
      try {
        const stored = await AsyncStorage.getItem("user");
        if (stored) {
          setUser(JSON.parse(stored));
        }
      } catch (e) {
        console.log("Session restore error:", e);
      } finally {
        // This ALWAYS runs — loading never gets stuck
        setLoading(false);
      }
    };
    restore();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(["token", "user"]);
    } catch (e) {
      console.log("Logout error:", e);
    } finally {
      setUser(null);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be inside UserProvider");
  return ctx;
};