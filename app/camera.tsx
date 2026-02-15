import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { supabase } from "../supabase";
import axios from "axios";

const GOOGLE_VISION_KEY = "AIzaSyBkUkMTsX0akiAmr6sWfNB0hahV43IYIV8"; // ⚠️ PON TU NUEVA KEY

export default function CameraScreen() {

  const { objeto } = useLocalSearchParams();
  const cameraRef = useRef<any>(null);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Permiso de cámara requerido</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Dar permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const capturar = async () => {
    try {

      if (!cameraRef.current) return;

      const foto = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.7,
      });

      if (!foto.base64) {
        Alert.alert("Error", "No se pudo obtener base64");
        return;
      }

      console.log("📸 Imagen capturada, enviando a Vision...");

      const response = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_KEY}`,
        {
          requests: [
            {
              image: { content: foto.base64 },
              features: [
                {
                  type: "LABEL_DETECTION",
                  maxResults: 5,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("VISION OK:", response.data);

      const labels = response.data.responses?.[0]?.labelAnnotations;

      if (!labels || labels.length === 0) {
        Alert.alert("No se detectaron objetos");
        return;
      }

      const detected = labels.map((l: any) =>
        l.description.toLowerCase()
      );

      console.log("Detectado:", detected);

      const buscado = objeto?.toString().toLowerCase();

      if (buscado && detected.includes(buscado)) {

        const { data: existing } = await supabase
          .from("score")
          .select("*")
          .eq("objeto", objeto)
          .maybeSingle();

        if (existing) {
          await supabase
            .from("score")
            .update({ veces: existing.veces + 1 })
            .eq("objeto", objeto);
        } else {
          await supabase
            .from("score")
            .insert([{ objeto, veces: 1 }]);
        }

        Alert.alert("✅ Correcto!");
      } else {
        Alert.alert("❌ No es el objeto correcto");
      }

      router.back();

    } catch (error: any) {

      console.log("VISION ERROR:", error.response?.data || error.message);

      Alert.alert(
        "Vision error",
        JSON.stringify(error.response?.data || error.message)
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" />
      <TouchableOpacity style={styles.btn} onPress={capturar}>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          📸 CAPTURAR
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "#00f7ff",
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 50,
    elevation: 5,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
