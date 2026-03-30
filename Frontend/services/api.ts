import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

//  HOW TO FIND YOUR IP:
//  Windows → open Command Prompt → type: ipconfig
//            look for "IPv4 Address" under your WiFi adapter
//            example: 192.168.1.8
//
//  Mac     → open Terminal → type: ipconfig getifaddr en0
//            example: 192.168.1.8
//
//  IMPORTANT: Your phone and computer MUST be on the SAME WiFi network
//
//  ❌ 10.0.2.2      → only works on Android Studio Emulator (NOT Expo Go)
//  ✅ 192.168.1.8   → works on physical phone with Expo Go
//  ✅ localhost      → only works on iOS Simulator
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = "http://192.168.1.7:5000/api";
//                        ↑↑↑↑↑↑↑↑↑
//               CHANGE THIS to your computer's IP address

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Attach saved JWT token to every request automatically
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Clear token globally if server returns 401 (expired)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);