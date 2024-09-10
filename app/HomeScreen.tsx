import { StyleSheet, Image } from "react-native";
import { useFetchLocation } from "../src/hooks/useFetchLocation";
import { Text, Container } from "../assets/styles/globalStyles";
import React from "react";

export default function HomeScreen() {
  const { locationAddress, price } = useFetchLocation();

  return (
    <Container
    // style={styles.container}
    >
      <Container
      // style={styles.upperPart}
      >
        <Image
          source={require("../assets/car-bg.png")}
          // style={styles.image}
        />
      </Container>
      <Container
      // style={styles.lowerPart}
      >
        <Text
        // style={styles.address}
        >
          {locationAddress}
        </Text>
        <Text
        // style={styles.price}
        >
          Price: {price} mdl/h
        </Text>
        <Container
        // style={styles.button}
        />
      </Container>
    </Container>
  );
}

const styles = StyleSheet.create({
  // Container style
  container: {
    display: "flex",
    flexDirection: "column",
    height: 100,
    backgroundColor: "#fff",
  },
  // Address style
  address: {
    fontSize: 33,
    marginRight: 20,
    marginLeft: 20,
    color: "white",
    fontFamily: "Roboto-Black",
    position: "relative",
    bottom: 140,
  },

  // Price style
  price: {
    fontSize: 26,
    marginRight: 20,
    marginLeft: 20,
    color: "white",
    fontFamily: "Roboto-Black",
    position: "relative",
    bottom: 12,
  },

  // Upper part of the screen
  upperPart: {
    flex: 1,
    backgroundColor: "#fec200",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  // Lower part of the screen
  lowerPart: {
    flex: 1,
    backgroundColor: "#282424",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  // Image style
  image: {
    width: 60,
    height: 60,
  },

  // Button style
  button: {
    width: 100,
    height: 40,
    marginTop: 20,
  },
});
