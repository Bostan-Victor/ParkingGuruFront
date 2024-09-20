import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

interface LineSquareProps {
  lines: Array<{ text: string; iconLeft: any; iconRight: any }>; // Array of objects for each line
}

const LineSquare: React.FC<LineSquareProps> = ({ lines }) => {
  return (
    <View style={styles.squareContainer}>
      {lines.map((line, index) => (
        <View key={index} style={styles.lineRow}>
          {/* Left Icon */}
          <Image source={line.iconLeft} style={styles.lineIcon} />
          {/* Text */}
          <Text style={styles.lineText}>{line.text}</Text>
          {/* Right Icon */}
          <Image source={line.iconRight} style={styles.lineIcon} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  squareContainer: {
    width: width * 0.9,
    backgroundColor: "#797979",
    borderRadius: 15,
    padding: 15,
  },
  lineRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  lineText: {
    fontSize: 16,
    color: "#FFFFFF",
    flex: 1,
    marginHorizontal: 5,
  },
  lineIcon: {
    width: 30,
    height: 30,
  },
});

export default LineSquare;
