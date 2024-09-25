import { StyleSheet, Image, View, Dimensions } from "react-native";
import { Text, Container } from "../../assets/styles/globalStyles";
import React from "react";

// Define the props interface
interface HeaderProps {
  content?: string;
  part?: number; // Corrected type for part
}

// Get the dimensions of the screen
const { width, height } = Dimensions.get("window");

const Header: React.FC<HeaderProps> = ({ content, part }) => {
  // Conditional styles and components
  const upperPartStyle = content
    ? styles.upperPartWithContent
    : styles.upperPartNoContent;
  const imageStyle = content ? styles.imageWithContent : styles.imageNoContent;
  const textComponent = content ? (
    <Text style={styles.content}>{content}</Text>
  ) : null;

  return (
    <Container style={styles.container}>
      <Container style={upperPartStyle}>
        {/* Conditionally render text */}
        {textComponent}
        {/* Conditionally apply image style */}
        <Image source={require("../../assets/car-bg.png")} style={imageStyle} />
      </Container>
      <Container
        style={[
          styles.lowerPart,
          { flexGrow: part, flexBasis: part }, // Apply dynamic styles
        ]}
      ></Container>
    </Container>
  );
};

const styles = StyleSheet.create({
  // Container style
  container: {
    flex: 1,
    flexDirection: "column",
  },

  // Upper part of the screen (smaller) in row
  upperPartWithContent: {
    flexGrow: 1,
    flexBasis: 1,
    backgroundColor: "#fec200",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    position: "relative", // Ensures child elements can be positioned absolutely
  },
  upperPartNoContent: {
    flexGrow: 1,
    flexBasis: 1,
    backgroundColor: "#fec200",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },

  // Image style
  imageWithContent: {
    width: width * 0.275, // Increased size to be more visible
    height: height * 0.12,
    position: "absolute", // Allows it to float over the background
    right: "10%", // Positions it 10% away from the right
    top: "30%", // Positions it 30% away from the top
    zIndex: 1, // Ensures the image is on top of the background
  },
  imageNoContent: {
    width: width * 0.3, // Increased size to be more visible
    height: height * 0.2, // Adjust height proportionally
  },

  content: {
    fontSize: 38,
    color: "black",
    fontWeight: "bold",
    position: "absolute", // Floats it over the background
    left: "15%", // Positions it 15% away from the left
    top: "30%", // Positions it 30% away from the top
    zIndex: 1, // Ensures the text is on top of the background
    width: "40%", // This controls how narrow the text container is, forcing it to break into two lines
    textAlign: "left", // Aligns the text to the left to look good on two lines
  },

  lowerPart: {
    backgroundColor: "#282424",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Header;
