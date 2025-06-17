import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles } from "../styles/globalStyles";
import Timer from "../components/Timer";
import { RootTabParamList } from "../navigation/types";
import { NavigationProp } from "@react-navigation/native";

type HomeRouteProp = RouteProp<RootTabParamList, "Pomodoro">;
type Navigation = NavigationProp<RootTabParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<HomeRouteProp>();

  const [project, setProject] = useState("");
  const [minutes, setMinutes] = useState("");
  const [startTimer, setStartTimer] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (route.params?.resumeProject) {
      setProject(route.params.resumeProject.name);
      setMinutes("0");
      setStartTimer(true);
      setIsPaused(false);
    }
  }, [route.params]);

  const validateAndStart = () => {
    const time = parseInt(minutes);
    if (!project.trim()) {
      Alert.alert("Erro", "Informe o nome do projeto.");
      return;
    }
    if (isNaN(time) || time <= 0 || time > 60) {
      Alert.alert("Erro", "Informe um tempo entre 1 e 60 minutos.");
      return;
    }
    setStartTimer(true);
    setIsPaused(false);
  };

  const saveProject = async () => {
    const now = new Date();
    const data = {
      name: project,
      time: now.toLocaleTimeString(),
      date: now.toLocaleDateString(),
    };

    const oldData = await AsyncStorage.getItem("pomodoroHistory");
    const history = oldData ? JSON.parse(oldData) : [];
    history.push(data);
    await AsyncStorage.setItem("pomodoroHistory", JSON.stringify(history));

    resetFields();
  };

  const resetFields = () => {
    setProject("");
    setMinutes("");
    setStartTimer(false);
    setIsPaused(false);
  };

  const handlePauseChange = (paused: boolean) => {
    setIsPaused(paused);
  };

  let title = "Novo Projeto";
  if (startTimer) {
    title = isPaused ? "Pausado" : "Ao trabalho";
  }

  return (
    <KeyboardAvoidingView
      style={globalStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={globalStyles.title}>{title}</Text>

      {!startTimer ? (
        <>
          <TextInput
            placeholder="Nome do Projeto"
            value={project}
            onChangeText={setProject}
            style={globalStyles.input}
            placeholderTextColor="#ccc"
          />

          <TextInput
            placeholder="Minutos (máx 60)"
            value={minutes}
            onChangeText={setMinutes}
            keyboardType="numeric"
            style={globalStyles.input}
            placeholderTextColor="#ccc"
            maxLength={2}
          />

          <TouchableOpacity
            style={globalStyles.button}
            onPress={validateAndStart}
          >
            <Text style={globalStyles.buttonText}>Iniciar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Timer
          duration={parseInt(minutes)}
          onFinish={saveProject}
          onCancel={resetFields}
          onPauseChange={handlePauseChange}
          onSaveEarly={async () => {
            await saveProject();
            resetFields();
          }}
        />
      )}

      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate("Histórico")}
      >
        <Text style={globalStyles.buttonText}>Ver Histórico</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
