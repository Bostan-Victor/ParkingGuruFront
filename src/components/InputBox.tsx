import { StyleSheet, TextInput, View } from "react-native";
import React from "react";

interface InputBoxProps {
  width: number;
  height: number;
  placeholder?: string;
  value: string; // Add value prop
  onChangeText: (text: string) => void; // Add onChangeText prop
}

export default function InputBox({ width, height, placeholder, value, onChangeText }: InputBoxProps) {
  const handleChangeText = (text: string) => {
    // Allow only alphanumeric characters and restrict to 10 characters
    const filteredText = text.replace(/[^a-zA-Z0-9]/g, "").slice(0, 10);
    onChangeText(filteredText);
  };

  return (
    <View style={[styles.inputContainer, { width, height }]}>
      <TextInput
        style={[styles.input, { height }]}
        placeholder={placeholder || "Enter text..."}
        placeholderTextColor="#fff"
        textAlign="center"
        value={value} // Bind value to TextInput
        onChangeText={handleChangeText} // Update state when text changes
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
    color: "#fff", 
    textAlign: "center",
    paddingVertical: 0,
  },
});
