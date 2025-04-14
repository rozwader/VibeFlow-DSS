import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>main page</Text>
      <Link href="/LoginScreen" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>login page</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/RegisterScreen" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>register page</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/skibidi" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>404 test</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginVertical: 10,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
