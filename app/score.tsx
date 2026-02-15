import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Score() {

  const [scores, setScores] = useState<any[]>([]);

  useEffect(() => {
    fetchScore();
  }, []);

  const fetchScore = async () => {
    const { data } = await supabase
      .from("score")
      .select("*")
      .order("veces", { ascending: false });

    setScores(data || []);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 SCOREBOARD</Text>

      <FlatList
        data={scores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text style={styles.rank}>#{index + 1}</Text>
            <Text style={styles.objeto}>{item.objeto}</Text>
            <Text style={styles.veces}>{item.veces}x</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0f1a", padding: 20 },
  title: { fontSize: 28, color: "#00f7ff", textAlign: "center", marginBottom: 20 },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1c1c2e",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#00f7ff",
  },
  rank: { color: "#ff00ff" },
  objeto: { color: "white", fontSize: 18 },
  veces: { color: "#00ff99" },
});
