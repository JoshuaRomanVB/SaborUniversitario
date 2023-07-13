import { StyleSheet } from "react-native";
import { colors } from "./colors";
export const inputStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 5,
  },

  input: {
    height: 50,
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#FFF",
    color: "#000",
    // Estilos para Android
    elevation: 2,
    // Estilos para iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    height: 50,
    paddingLeft: 40,
    marginHorizontal: 20,
    borderRadius: 30,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  icon: {
    position: "absolute",
    left: 30,
    top: 12,
  },
  touchable: {
    position: "absolute",
    right: 30,
    padding: 12,
  },
});
