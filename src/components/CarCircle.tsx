import { StyleSheet, View, Image, Dimensions } from "react-native";
import React from "react";
import { Container, Text } from "../../assets/styles/globalStyles";

// Get device width and height for dynamic sizing
const { width } = Dimensions.get("window");

interface CarCircleProps {
  plate: string; // Define the plate prop
}

export default function CarCircle({ plate }: CarCircleProps) {
  return (
    <Container style={styles.container}>
      <View style={styles.imageContainer}>
        {/* Circle image (background) */}
        <Image
          source={require("../../assets/1.png")}
          style={styles.imageCircle}
        />
        {/* Car image (centered in the circle) */}
        <Image
          source={require("../../assets/car.png")}
          style={styles.imageCar}
        />
        {/* License plate text positioned under the car */}
        <Text style={styles.plate}>{plate}</Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#282424", // Dark background
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  imageContainer: {
    position: "relative", // Use relative positioning for the container
    width: width * 0.7, // Increase the size of the circle container
    height: width * 0.7, // Keep the container square with larger size
  },
  imageCircle: {
    width: "100%", // Full width of the container
    height: "100%", // Full height of the container
    resizeMode: "contain", // Ensure the image maintains aspect ratio
  },
  imageCar: {
    position: "absolute", // Position the car absolutely within the container
    top: "20%", // Adjust these values to center the car within the circle
    left: "20%", // Adjust these values to center the car within the circle
    width: "60%", // Increase the size of the car relative to the circle
    height: "60%", // Maintain the aspect ratio of the car
    resizeMode: "contain", // Maintain aspect ratio of the car
  },
  plate: {
    position: "absolute", // Position the plate text within the circle
    bottom: "22%", // Adjust the position to move it closer to the bottom of the circle
    left: 0,
    right: 0,
    textAlign: "center", // Center the text horizontally
    fontSize: width * 0.06, // Increase font size for the plate number
    color: "#fff", // White text
    fontWeight: "bold",
  },
});
