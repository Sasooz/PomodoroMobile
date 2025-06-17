import { StyleSheet } from "react-native";

export const colors = {
  primary: "#4FC3F7",
  secondary: "#FFD54F",
  background: "#121212",
  surface: "#1E1E1E",
  white: "#FFFFFF",
  black: "#000000",
  gray: "#AAAAAA",
  danger: "#FF5252",
  border: "#2C2C2C",
  inputBackground: "#2A2A2A",
};

export const spacing = {
  xs: 6,
  sm: 12,
  md: 20,
  lg: 32,
};

export const fontSize = {
  title: 26,
  heading: 20,
  body: 16,
  small: 14,
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
    backgroundColor: colors.background,
  },

  title: {
    fontSize: fontSize.title,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: spacing.md,
    textAlign: "center",
  },

  heading: {
    fontSize: fontSize.heading,
    fontWeight: "600",
    color: colors.white,
    marginBottom: spacing.sm,
  },

  saveEarlyButton: {
    backgroundColor: colors.secondary,
    marginVertical: spacing.sm,
    borderRadius: 8,
    padding: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    padding: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: spacing.sm,
  },

  buttonText: {
    color: colors.black,
    fontSize: fontSize.body,
    fontWeight: "600",
  },

  projectItem: {
    padding: spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },

  input: {
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: spacing.sm,
    backgroundColor: colors.inputBackground,
    color: colors.white,
    fontSize: fontSize.body,
    marginBottom: spacing.md,
  },

  timerText: {
    fontSize: 48,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.md,
  },

  centeredContent: {
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    alignItems: "center",
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
  },
  headerTitle: {
    fontSize: fontSize.title,
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },

  emptyText: {
    fontSize: fontSize.body,
    color: colors.gray,
    textAlign: "center",
    marginTop: spacing.lg,
  },

  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    height: 60,
    paddingBottom: 5,
  },
  tabBarLabel: {
    fontSize: fontSize.small,
    color: colors.white,
    marginBottom: 5,
  },

  scrollView: {
    flex: 1,
    marginBottom: spacing.md,
  },

  text: {
    color: colors.white,
    fontSize: fontSize.body,
  },

  boldText: {
    color: colors.white,
    fontSize: fontSize.body,
    fontWeight: "700",
  },

  dangerButton: {
    backgroundColor: colors.danger,
  },

  hiddenButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    marginBottom: spacing.sm,
    borderRadius: 8,
    overflow: "hidden",
  },

  hiddenButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },

  modalContent: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    width: "80%",
  },
});
