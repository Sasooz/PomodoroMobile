import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <View style={globalStyles.header}>
      <Text style={globalStyles.headerTitle}>{title}</Text>
    </View>
  );
}
