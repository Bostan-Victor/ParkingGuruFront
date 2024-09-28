import { StyleSheet, Image } from "react-native";
import { useFetchLocation } from "../hooks/useFetchLocation";
import { Text, Container } from "../../assets/styles/globalStyles";
import React from "react";
// import theme from "../../assets/styles/theme";
import { SwipeButton } from "@arelstone/react-native-swipe-button";
import NavigationBar from "../components/NavigationBar"; // Import the NavigationBar component

export default function UserHomeScreen() {
  const { locationAddress, price } = useFetchLocation();

  // Define pages for the NavigationBar
  const pages = [
    { name: "Profile", route: "ProfilePage" }, // Add the ProfilePage as a route
    { name: "Profile", route: "ProfilePage" }, // Add the ProfilePage as a route
    { name: "Profile", route: "ProfilePage" }, // Add the ProfilePage as a route
    // Add more pages here if needed
  ];

  return (
    <Container style={styles.container}>
      {/* NavigationBar */}
      <NavigationBar pages={pages} />

      {/* Upper part with the car image */}
      <Container style={styles.upperPart}>
        <Image
          source={require("../../assets/car-bg.png")}
          style={styles.image}
        />
      </Container>

      {/* Lower part with address, price, and swipe button */}
      <Container style={styles.lowerPart}>
        <Text style={styles.address}>{locationAddress}</Text>
        <Text style={styles.price}>Price: {price} mdl/h</Text>
        <SwipeButton
          onComplete={() => console.log("work")}
          Icon={
            <Image
              source={require("../../assets/icons8-arrow-96.svg")}
              style={{ width: 96, height: 96 }}
            />
          }
          title={"title"}
        />
      </Container>
    </Container>
  );
}

const styles = StyleSheet.create({
  // Container style
  container: {
    flex: 1,
    flexDirection: "column",
  },

  // Address style
  address: {
    fontSize: 33,
    color: "white",
    fontFamily: "Roboto-Black",
    position: "relative",
    bottom: "30%",
  },

  // Price style
  price: {
    fontSize: 26,
    color: "white",
    fontFamily: "Roboto-Black",
    position: "relative",
    bottom: "22%",
  },

  // Upper part of the screen (smaller)
  upperPart: {
    flexGrow: 1,
    flexBasis: 1,
    backgroundColor: "#fec200",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },

  // Lower part of the screen (larger)
  lowerPart: {
    flexGrow: 2,
    flexBasis: 2,
    backgroundColor: "#282424",
    justifyContent: "center",
    alignItems: "center",
  },

  // Image style
  image: {
    width: "50%",
    height: "60%",
  },
});
