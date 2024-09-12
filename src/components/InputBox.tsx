import { StyleSheet, TextInput, View } from "react-native";
import React from "react";

interface InputBoxProps {
  width: number;
  height: number;
  placeholder?: string;
}

export default function InputBox({ width, height, placeholder }: InputBoxProps) {
  return (
    <View style={[styles.inputContainer, { width, height }]}>
      <TextInput
        style={[styles.input, { height }]}
        placeholder={placeholder || "Enter text..."}
        placeholderTextColor="#fff"
        textAlign="center" // centers the text horizontally
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    borderColor: "#474747",
    backgroundColor: "#474747",
    borderWidth: 2,
    borderRadius: 40,
    justifyContent: "center",
  },
  input: {
    fontSize: 16,
    color: "#fff", // Set the text color to white
    textAlign: "center", // horizontal centering
    paddingVertical: 0, // avoid extra padding at the top and bottom
  },
});
