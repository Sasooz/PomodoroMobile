import React, { createContext, useState, useContext, useEffect } from "react";
import {
  loadProjects,
  saveProjects,
  clearProjects as clearStorage,
  StoredProject,
} from "../storage/projectStorage";

type PomodoroContextType = {
  projects: StoredProject[];
  addProject: (name: string) => void;
  clearProjects: () => void;
};

const PomodoroContext = createContext<PomodoroContextType>(
  {} as PomodoroContextType
);

export const PomodoroProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [projects, setProjects] = useState<StoredProject[]>([]);

  useEffect(() => {
    loadProjects()
      .then(setProjects)
      .catch(() => setProjects([]));
  }, []);

  const addProject = (name: string) => {
    const newProject = {
      name,
      date: new Date().toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      }),
    };
    const updated = [newProject, ...projects];
    setProjects(updated);
    saveProjects(updated);
  };

  const clearProjects = async () => {
    await clearStorage();
    setProjects([]);
  };

  return (
    <PomodoroContext.Provider value={{ projects, addProject, clearProjects }}>
      {children}
    </PomodoroContext.Provider>
  );
};

export const usePomodoro = () => useContext(PomodoroContext);
