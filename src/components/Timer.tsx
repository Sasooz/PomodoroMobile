import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { Audio } from "expo-av";

interface TimerProps {
  duration?: number;
  onFinish: () => void;
  onCancel: () => void;
  onSaveEarly?: () => void;
  onPauseChange?: (paused: boolean) => void;
}

export default function Timer({
  duration,
  onFinish,
  onCancel,
  onSaveEarly,
  onPauseChange,
}: TimerProps) {
  const [inputMinutes, setInputMinutes] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(duration ? duration * 60 : 0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(!!duration);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (hasStarted && !isPaused) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            playSound();
            onFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [hasStarted, isPaused]);

  useEffect(() => {
    onPauseChange?.(isPaused);
  }, [isPaused]);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/notification.mp3")
    );
    await sound.playAsync();
  };

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const handleStart = () => {
    const time = parseInt(inputMinutes);
    if (isNaN(time) || time <= 0 || time > 60) return;
    setSecondsLeft(time * 60);
    setHasStarted(true);
    setIsPaused(false);
  };

  if (!hasStarted) {
    return (
      <View>
        <Text style={globalStyles.timerText}>Informe o tempo novamente:</Text>
        <TextInput
          style={globalStyles.input}
          value={inputMinutes}
          onChangeText={setInputMinutes}
          placeholder="Minutos"
          keyboardType="numeric"
          maxLength={2}
        />
        <TouchableOpacity style={globalStyles.button} onPress={handleStart}>
          <Text style={globalStyles.buttonText}>Começar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
      <Text style={globalStyles.timerText}>{formatTime(secondsLeft)}</Text>

      <TouchableOpacity
        style={[globalStyles.button, globalStyles.dangerButton]}
        onPress={onCancel}
      >
        <Text style={globalStyles.buttonText}>Encerrar</Text>
      </TouchableOpacity>

      {onSaveEarly && (
        <TouchableOpacity
          style={[globalStyles.button, globalStyles.saveEarlyButton]}
          onPress={onSaveEarly}
        >
          <Text style={globalStyles.buttonText}>Salvar e Encerrar</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => setIsPaused(!isPaused)}
      >
        <Text style={globalStyles.buttonText}>
          {isPaused ? "Continuar" : "Pausar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
