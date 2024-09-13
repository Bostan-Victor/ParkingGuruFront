// ClickableText.tsx
import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

interface ClickableTextProps {
  text: string; // The text to display
  onPress: () => void; // Function to call when the text is pressed
  highlightText: string; // The text to highlight in a different color (e.g., "Sign up")
}

const ClickableText: React.FC<ClickableTextProps> = ({
  text,
  onPress,
  highlightText,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>
        {text.split(highlightText)[0]} {/* Regular part of the text */}
        <Text style={styles.highlight}>{highlightText}</Text>{" "}
        {/* Highlighted part */}
        {text.split(highlightText)[1]} {/* Rest of the text */}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#fff", // Default color for text
    textAlign: "center",
    marginTop: 20, // Add some spacing from the button
  },
  highlight: {
    color: "#F0C10B", // Highlight color (e.g., Yellow for "Sign up")
    fontWeight: "bold",
  },
});

export default ClickableText;
