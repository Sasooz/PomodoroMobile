import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import HistoryScreen from "./src/screens/HistoryScreen";

import { RootStackParamList } from "./src/navigation/types";
import { colors, globalStyles } from "./src/styles/globalStyles";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Pomodoro"
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.primary,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 26,
            color: colors.white,
          },
        }}
      >
        <Stack.Screen
          name="Pomodoro"
          component={HomeScreen}
          options={{ title: "Pomodoro" }}
        />
        <Stack.Screen
          name="Histórico"
          component={HistoryScreen}
          options={{ title: "Histórico" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
