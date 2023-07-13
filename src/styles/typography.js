import { StyleSheet } from "react-native";
import { colors } from "./colors";
export const typography = StyleSheet.create({
  heading1: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 32,
    textAlign: "center",
    color: colors.black,
    marginVertical: 10,
  },
  heading2: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.black,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: "normal",
    color: colors.black,
    lineHeight: 24,
  },
  captionC: {
    fontSize: 14,
    fontWeight: "normal",
    color: colors.black,
    marginHorizontal: 10,
    textAlign: "center",
    lineHeight: 16,
  },
  caption: {
    fontSize: 14,
    fontWeight: "normal",

    color: colors.black,
    lineHeight: 16,
  },
  captionM: {
    fontSize: 14,
    fontWeight: "normal",

    color: colors.black,
    lineHeight: 16,
    marginVertical: 10,
  },
  captionSecundary: {
    fontSize: 14,
    fontWeight: "normal",
    color: colors.primary,
  },

  text: {
    fontSize: 14,
    fontWeight: "normal",
    color: colors.black,
  },

  textSecundary: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: "normal",

    textAlign: "center",
    color: colors.black,
  },
  textSub: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: "normal",
    color: colors.black,
  },
});
