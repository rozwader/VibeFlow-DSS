import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

import vibeflowlogo from "../assets/images/vibeflowlogo.png";

export default function HomeScreen() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);

  const checkToken = useCallback(async (token) => {
    try {
      const request = await fetch("http://192.168.1.220:3000/api/auth/tokencheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await request.json();
      console.log("Token check response:", data);

      if (!request.ok) {
        await AsyncStorage.multiRemove(["TOKEN", "User"]);
        setIsLoggedIn(false);
        setUserName(null);
        console.log("Token invalid, removed from storage.");
      } else {
        setIsLoggedIn(true);
        console.log("Token valid.");
      }
    } catch (err) {
      console.error("Error checking token:", err);
      await AsyncStorage.multiRemove(["TOKEN", "User"]);
      setIsLoggedIn(false);
      setUserName(null);
    }
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem("TOKEN");
        const user = await AsyncStorage.getItem("User");

        if (token) {
          console.log("Token found:", token);
          setUserName(user);
          await checkToken(token);
        } else {
          console.log("No token found.");
          setIsLoggedIn(false);
          setUserName(null);
        }
      } catch (error) {
        console.error("Error reading auth data from AsyncStorage:", error);
        setIsLoggedIn(false);
        setUserName(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [checkToken]);

  const handleListenNow = () => {
    if (isLoggedIn) {
      router.push("/MusicScreen/");
    } else {
      router.push("/LoginScreen");
    }
  };

  const handleStartJourney = () => {
    if (isLoggedIn) {
      router.push("/MusicScreen/");
    } else {
      router.push("/RegisterScreen");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topRightContainer}>
        <TouchableOpacity onPress={handleListenNow} style={styles.listenButton}>
          <Ionicons
            name="play-circle"
            size={20}
            color="#333"
            style={styles.icon}
          />
          <Text style={styles.listenButtonText}>Listen now</Text>
        </TouchableOpacity>

        {isLoggedIn && userName ? (
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>Hello, {userName}</Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => router.push("/LoginScreen")}
            style={styles.signInButton}
          >
            <Ionicons
              name="person"
              size={20}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.signInButtonText}>Sign in</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.mainContent}>
        <Image source={vibeflowlogo} style={styles.logo} resizeMode="contain" />

        <TouchableOpacity
          onPress={handleStartJourney}
          style={styles.startButton}
        >
          <Ionicons
            name="musical-notes"
            size={24}
            color="#8A2BE2"
            style={styles.icon}
          />
          <Text style={styles.startButtonText}>Start Your Journey</Text>
          <Ionicons
            name="arrow-forward-circle-outline"
            size={24}
            color="#8A2BE2"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fefefe",
  },
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  topRightContainer: {
    position: "absolute",
    top: 50,
    right: 15,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
  },
  icon: {
    marginRight: 5,
  },
  listenButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  listenButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  greetingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#333",
    borderWidth: 1,
    borderColor: "#333",
  },
  greetingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  signInButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#000",
  },
  signInButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 280,
    height: 280,
    marginBottom: 60,
  },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#8A2BE2",
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8A2BE2",
    marginHorizontal: 10,
  },
});
