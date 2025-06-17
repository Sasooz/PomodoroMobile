import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SwipeListView } from "react-native-swipe-list-view";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootTabParamList } from "../navigation/types";
import { globalStyles } from "../styles/globalStyles";

type Navigation = NavigationProp<RootTabParamList>;

interface Project {
  name: string;
  time: string;
  date: string;
}

export default function HistoryScreen() {
  const [history, setHistory] = useState<Project[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newName, setNewName] = useState("");
  const navigation = useNavigation<Navigation>();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await AsyncStorage.getItem("pomodoroHistory");
    if (data) {
      setHistory(JSON.parse(data));
    }
  };

  const saveHistory = async (updated: Project[]) => {
    setHistory(updated);
    await AsyncStorage.setItem("pomodoroHistory", JSON.stringify(updated));
  };

  const deleteProject = (index: number) => {
    Alert.alert("Excluir Projeto", "Deseja realmente excluir este projeto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          const updated = [...history];
          updated.splice(index, 1);
          saveHistory(updated);
        },
      },
    ]);
  };

  const editProjectName = () => {
    if (editingIndex === null || !newName.trim()) return;

    const updated = [...history];
    updated[editingIndex].name = newName.trim();
    saveHistory(updated);

    setEditingIndex(null);
    setNewName("");
  };

  const resumeProject = (item: Project) => {
    navigation.navigate("Pomodoro", { resumeProject: item });
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Histórico de Projetos</Text>

      {history.length === 0 ? (
        <Text style={globalStyles.emptyText}>Nenhum projeto salvo ainda.</Text>
      ) : (
        <SwipeListView
          data={history}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={globalStyles.projectItem}
              onPress={() => resumeProject(item)}
            >
              <Text style={globalStyles.boldText}>{item.name}</Text>
              <Text style={globalStyles.text}>
                Concluído em {item.date} às {item.time}
              </Text>
            </TouchableOpacity>
          )}
          renderHiddenItem={({ item, index }) => (
            <View style={globalStyles.hiddenButtons}>
              {/* Editar à direita */}
              <TouchableOpacity
                style={[
                  globalStyles.hiddenButton,
                  { backgroundColor: "#4CAF50" },
                ]}
                onPress={() => {
                  setEditingIndex(index);
                  setNewName(item.name);
                }}
              >
                <Text style={globalStyles.buttonText}>✏️</Text>
              </TouchableOpacity>

              {/* Excluir à esquerda */}
              <TouchableOpacity
                style={[
                  globalStyles.hiddenButton,
                  { backgroundColor: "#f44336" },
                ]}
                onPress={() => deleteProject(index)}
              >
                <Text style={globalStyles.buttonText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          )}
          leftOpenValue={75}
          rightOpenValue={-75}
        />
      )}

      {/* Modal de Edição */}
      <Modal visible={editingIndex !== null} transparent animationType="slide">
        <View style={globalStyles.modalContainer}>
          <View style={globalStyles.modalContent}>
            <Text style={globalStyles.heading}>Editar Nome do Projeto</Text>
            <TextInput
              style={globalStyles.input}
              value={newName}
              onChangeText={setNewName}
              placeholder="Novo nome"
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity
              style={globalStyles.button}
              onPress={editProjectName}
            >
              <Text style={globalStyles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[globalStyles.button, globalStyles.dangerButton]}
              onPress={() => setEditingIndex(null)}
            >
              <Text style={globalStyles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
