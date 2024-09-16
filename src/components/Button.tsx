import { StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";
import React from "react";

interface SignInButtonProps {
  content?: string; // Optional prop for button text
  onPress?: () => void; // Optional prop for handling button press
}

const { width, height } = Dimensions.get("window"); // Get screen dimensions for dynamic styling

export default function SignInButton({ content = "SIGN IN", onPress }: SignInButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{content}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#F0C10B",
    paddingVertical: height * 0.01, // Dynamic vertical padding
    paddingHorizontal: width * 0.05, // Dynamic vertical padding
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: width * 0.15, // Set button width smaller than input boxes
    marginTop: height * 0.02, // Dynamic margin based on screen height
  },
  buttonText: {
    color: "#000",
    fontSize: width * 0.06, // Dynamic font size
    fontWeight: "bold",
  },
});
