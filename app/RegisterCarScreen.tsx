import { StyleSheet } from "react-native";
import { useFetchLocation } from "../src/hooks/useFetchLocation";
import { Text, Container } from "../assets/styles/globalStyles";
import React, { useState, useEffect } from "react";
import Header from "../src/components/Header";
import Button from "../src/components/Button";
import InputBox from "../src/components/InputBox";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useRegisterCarMutation } from "./../src/services/placeApi";
import BackProfileHeader from "../src/components/NavBar"; // Import the BackProfileHeader component

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "RegisterCar"
>;

export default function RegisterCar() {
  const { locationAddress } = useFetchLocation();
  const navigation = useNavigation<NavigationProp>();
  const [location, setLocation] = useState(locationAddress);
  const [plate, setPlate] = useState("");
  const [registerCar, { isLoading, error }] = useRegisterCarMutation();

  useEffect(() => {
    // Update the location state whenever the fetched locationAddress changes
    setLocation(locationAddress);
  }, [locationAddress]);

  const handleBackPress = () => {
    navigation.goBack(); // Navigate back to the previous page
  };

  const handleProfilePress = () => {
    navigation.navigate("Profile"); // Navigate to the profile page
  };

  const handleButton = async () => {
    if (!plate.trim()) {
      console.error("Plate number cannot be empty");
      return;
    }

    if (location === "Waiting for location...") {
      console.error("Location has not been updated yet");
      return;
    }

    const userInfo = {
      plateNumber: plate,
      address: location,
    };

    try {
      const result = await registerCar(userInfo).unwrap();
      console.log("Reservation created:", result);
      // Navigate after successful registration
      navigation.navigate("UserParking");
    } catch (err) {
      console.error("Error creating reservation:", error);
    }
  };

  return (
    <Container>
      {/* Back and Profile header */}
      <BackProfileHeader
        onBackPress={handleBackPress}
        onProfilePress={handleProfilePress}
      />

      <Header content="Register your car" part={3} />
      <Container style={styles.inputContainer}>
        <InputBox
          width={300}
          height={50}
          placeholder="Enter your number plate"
          value={plate}
          onChangeText={setPlate}
        />
      </Container>
      <Text style={styles.text}>
        Please verify the car number plate{"\n"}before submitting it
      </Text>
      <Container style={styles.buttonContainer}>
        <Button content="Park" onPress={handleButton} />
      </Container>
    </Container>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    top: "45%",
    position: "absolute",
    alignSelf: "center",
  },
  inputContainer: {
    position: "absolute",
    bottom: "63%",
    alignSelf: "center",
  },
  text: {
    position: "absolute",
    top: "40%",
    color: "white",
    alignSelf: "center",
  },
});
