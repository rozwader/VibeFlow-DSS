import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import vibeflowlogo from "../assets/images/vibeflowlogo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function loginScreen() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    try{
      const request = await fetch("http://192.168.1.220:3000/api/auth/login/", { // fetch wysylajacy zapytanie do lokalnego api o zaloganie uzytkownika
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      if (request.ok) {
        const data = await request.json();
        await AsyncStorage.setItem("TOKEN", data.message);
        await AsyncStorage.setItem("User", username);
        router.push('/MusicScreen/')
      } else {
        const message = await request.json();
        console.log(message);
      }
    }catch(err){
      console.log(`Couldn't log in | ${err}`)
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={vibeflowlogo} style={styles.logo} />

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="person"
                size={20}
                color="gray"
                style={styles.icon}
              />
              <TextInput style={styles.input} placeholder="Enter Your Name" onChangeText={text => setUsername(text)} />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed"
                size={20}
                color="gray"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter Your Password"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Sign in</Text>
          </TouchableOpacity>

          <Text style={styles.separatorText}>or</Text>

          <TouchableOpacity style={styles.socialButton}>
            <Ionicons
              name="logo-google"
              size={20}
              color="gray"
              style={styles.icon}
            />
            <Text style={styles.socialButtonText}>Sign in with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Ionicons
              name="logo-facebook"
              size={20}
              color="gray"
              style={styles.icon}
            />
            <Text style={styles.socialButtonText}>Sign in with Facebook</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  formContainer: {
    width: "90%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    color: "#4a4a4a",
    fontWeight: "600",
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  submitButton: {
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  separatorText: {
    textAlign: "center",
    color: "#999",
    marginVertical: 10,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  socialButtonText: {
    color: "#4a4a4a",
  },
});
