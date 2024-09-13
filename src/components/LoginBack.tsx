import { StyleSheet, TextInput, View, Image, Dimensions } from "react-native";
import React from "react";
import { Container, Text } from "../../assets/styles/globalStyles";

// Get device width and height for dynamic sizing
const { width, height } = Dimensions.get("window");

export default function LoginBack() {
  return (
    <Container style={styles.container}>
      {/* Container for the car on the left */}
      <View style={styles.carContainer}>
        <Image
          source={require("../../assets/car-bg.png")} // Add your car image here
          style={styles.carImage}
        />
      </View>

      {/* Container for the text on the right */}
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Welcome{"\n"}Back</Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#282424", // Dark background
  },
  carContainer: {
    width: "100%", // Full width of the screen
    flexDirection: "row", // Place image to the left
    justifyContent: "flex-end", // Align the car image to the left
    paddingHorizontal: width * 0.1, // Dynamic padding based on screen width
    paddingTop: height * 0.05, // Dynamic padding based on screen height
    alignItems: "center", // Vertically center the image
  },
  carImage: {
    width: width * 0.35, // Adjust as necessary based on screen width
    height: width * 0.35, // Maintain the aspect ratio
    resizeMode: "contain",
  },
  textContainer: {
    width: "100%", // Full width of the screen
    flexDirection: "row", // Place text on the right
    justifyContent: "flex-start", // Align the text to the right
    paddingHorizontal: width * 0.1, // Dynamic padding based on screen width
    paddingBottom: height * 0.02, // Dynamic padding based on screen height
    alignItems: "center", // Vertically center the text
  },
  headerText: {
    fontSize: width * 0.1, // Dynamic font size based on screen width
    fontWeight: "bold",
    color: "#F0C10B", // Yellow color for "Create Account"
  },
});
