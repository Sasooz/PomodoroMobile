import AsyncStorage from "@react-native-async-storage/async-storage";

export interface StoredProject {
  name: string;
  date: string;
  time?: string;
}

const STORAGE_KEY = "pomodoroHistory";

export const saveProjects = async (
  projects: StoredProject[]
): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(projects);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error("Erro ao salvar projetos:", e);
  }
};

export const loadProjects = async (): Promise<StoredProject[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Erro ao carregar projetos:", e);
    return [];
  }
};

export const clearProjects = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Erro ao limpar projetos:", e);
  }
};
