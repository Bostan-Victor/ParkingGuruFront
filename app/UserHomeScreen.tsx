import { StyleSheet, Image, Dimensions } from "react-native";
import { useFetchLocation } from "./../src/hooks/useFetchLocation";
import { Text, Container } from "./../assets/styles/globalStyles";
import React, { useState } from "react";
import { SwipeButton } from "@arelstone/react-native-swipe-button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import Navbar from "./../src/components/NavBar";

const { width, height } = Dimensions.get("window"); // Get the window dimensions here
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "UserHome">;

export default function UserHomeScreen() {
  const navigation = useNavigation<NavigationProp>(); // Call useNavigation to get navigation object
  const { locationAddress, price } = useFetchLocation();


  const handleButton = () => {
    navigation.navigate("RegisterCar");
  };

  const handleProfilePress = () => {
    navigation.navigate("Profile");
  };


  return (
    <Container style={styles.container}>
      <Navbar onProfilePress={handleProfilePress} />
      <Container style={styles.upperPart}>
        <Image
          source={require("./../assets/car-bg.png")}
          style={styles.image}
        />
      </Container>
      <Container style={styles.lowerPart}>
        <Text style={styles.address}>{locationAddress}</Text>
        <Text style={styles.price}>Price: {price} mdl/h</Text>
        <SwipeButton
      onComplete={() => handleButton()}
      Icon={
        <Image
          source={require('./../assets/icons8-arrow-96.svg')}
          style={{ width: 40, height: 40 }}
        />
      }
      title={"Slide to park"}
      underlayStyle={{ backgroundColor: '#282424' }} 
      goBackToStart={true}
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

  // Address style (horizontally centered)
  address: {
    fontSize: 33,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center", // Centers the text horizontally within the container
    marginBottom: height * 0.1, // This is where we use the dynamic margin
  },

  // Price style (horizontally centered)
  price: {
    fontSize: 26,
    color: "white",
    fontWeight: "normal",
    alignSelf: "center",
    marginBottom: height * 0.1, // Centers the text horizontally within the container
  },

  // Image style
  image: {
    width: "50%",
    height: "60%",
  },
});
