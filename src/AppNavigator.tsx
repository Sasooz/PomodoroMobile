import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/HomeScreen";
import History from "./screens/HistoryScreen";
import { Ionicons } from "@expo/vector-icons";
import { colors, globalStyles } from "./styles/globalStyles";
import { RootTabParamList } from "./navigation/types";

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: globalStyles.tabBar,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.gray,
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Pomodoro") {
              iconName = "timer-outline";
            } else if (route.name === "Histórico") {
              iconName = "list-outline";
            }
            return (
              <Ionicons name={iconName as any} size={size} color={color} />
            );
          },
          tabBarLabelStyle: globalStyles.tabBarLabel,
        })}
      >
        <Tab.Screen name="Pomodoro" component={Home} />
        <Tab.Screen name="Histórico" component={History} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
