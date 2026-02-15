import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

const objetos = [
  "house",
  "car",
  "computer",
  "television",
  "door",
  "table"
];

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 ObjectHunter AI</Text>

      {objetos.map((objeto) => (
        <TouchableOpacity
          key={objeto}
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: "/camera",
              params: { objeto },
            })
          }
        >
          <Text style={styles.text}>{objeto.toUpperCase()}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.scoreBtn}
        onPress={() => router.push("../score")}
      >
        <Text style={{ color: "white" }}>🏆 SCORE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f1a",
    padding: 20,
    justifyContent: "center"
  },
  title: {
    fontSize: 30,
    color: "#00f7ff",
    textAlign: "center",
    marginBottom: 40,
    fontWeight: "bold"
  },
  card: {
    backgroundColor: "#1c1c2e",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#00f7ff"
  },
  text: {
    color: "white",
    fontSize: 18,
    textAlign: "center"
  },
  scoreBtn: {
    marginTop: 30,
    backgroundColor: "#ff00ff",
    padding: 15,
    borderRadius: 15,
    alignItems: "center"
  }
});
