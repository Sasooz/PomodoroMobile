import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { usePomodoro } from "../contexts/PomodoroContext";
import { globalStyles, colors } from "../styles/globalStyles";

export default function ProjectForm() {
  const { addProject } = usePomodoro();
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (name.trim()) {
      addProject(name.trim());
      setName("");
    }
  };

  return (
    <View style={{ marginTop: 20 }}>
      <TextInput
        placeholder="Nome do projeto"
        style={globalStyles.input}
        placeholderTextColor={colors.gray}
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity
        style={globalStyles.button}
        onPress={handleAdd}
        activeOpacity={0.8}
      >
        <Text style={globalStyles.buttonText}>Salvar Projeto</Text>
      </TouchableOpacity>
    </View>
  );
}
