import { StyleSheet, Dimensions, TouchableOpacity, View, Image, Platform } from "react-native";
import { Container } from "../assets/styles/globalStyles";
import React, { useState, useEffect } from "react";
import Circle from "../src/components/CarCircle";
import Timer from "../src/components/Timer";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import Button from "../src/components/Button";
import { Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';
import { useGetActiveReservationByPlateMutation } from "./../src/services/placeApi";

const { width, height } = Dimensions.get("window");
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "PoliceParking">;

export default function UserParking() {
  const navigation = useNavigation<NavigationProp>();
  const [hasTicket, setHasTicket] = useState(0);
  const [time, setTime] = useState(1);
  const [phone, setPhone] = useState();
  const [plate, setPlate] = useState<string | undefined>();
  const [buttonContent, setButtonContent] = useState("Confirm");
  const [getActiveReservationByPlate, { data, error, isLoading }] = useGetActiveReservationByPlateMutation();

  // Function to retrieve the plate number from AsyncStorage or SecureStore
  const getPlate = async () => {
    try {
      if (Platform.OS === 'web') {
        const plate = await AsyncStorage.getItem('plateNumber');
        return plate;
      } else {
        const plate = await SecureStore.getItemAsync('plateNumber');
        return plate;
      }
    } catch (error) {
      console.error("Error retrieving plate number", error);
      return null;
    }
  };

  // Fetch the plate number and call the API to get the active reservation by plate
  useEffect(() => {
    const fetchPlateAndReservation = async () => {
      const plateNumber = await getPlate();
      if (plateNumber) {
        setPlate(plateNumber);  // Set the plate in state

        try {
          // Call the mutation to get the reservation by plate
          const response = await getActiveReservationByPlate(plateNumber);
          const reservationTime = response.data?.data?.activeReservationByPlate.elapsedTime;
          if(response.data?.data?.activeReservationByPlate.success === true){
            setHasTicket(1);
          }
          setPhone(response.data?.data?.activeReservationByPlate.user.phoneNumber);
          if (reservationTime) {
            setTime(reservationTime);
            console.log(time);
          }

          console.log("Reservation response: ", response);
        } catch (err) {
          console.error("Error fetching reservation:", err);
        }
      }
    };

    fetchPlateAndReservation(); // Fetch plate and reservation
  }, [getActiveReservationByPlate]);

  // UseEffect to log the state once it's updated
  useEffect(() => {
    console.log("Updated time state: ", time);
  }, [time]); // Log the new time state whenever it changes

  // Function to handle button press
  const handleButton = () => {
    navigation.navigate("VerifyCar");
  };

  // Function to handle calling a number
  const handleCall = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  // Update button content based on the ticket state
  useEffect(() => {
    if (hasTicket === 0) {
      setButtonContent("Fee");
    } else {
      setButtonContent("Confirm");
    }
  }, [hasTicket]);

  return (
    <Container style={styles.container}>
      <Container style={styles.circle}>
        <Circle plate={plate} />
      </Container>
      <Container style={styles.timer}>
        {/* Using key={time} to force re-rendering when the time updates */}
        <Timer key={time} hasTicket={hasTicket} initialSeconds={time} />
      </Container>
      <View style={styles.imageButtonContainer}>
        {/* Phone button */}
        <TouchableOpacity onPress={() => handleCall("+654321")} style={[styles.iconButton, styles.phoneButton]}>
          <Image source={require("./../assets/phone.png")} style={styles.iconImage} />
        </TouchableOpacity>
        {/* Tow button */}
        <TouchableOpacity onPress={() => handleCall("+1234567")} style={styles.iconButton}>
          <Image source={require("./../assets/tow.png")} style={styles.iconImage} />
        </TouchableOpacity>
      </View>
      <Container style={styles.buttonContainer}>
        <Button content={buttonContent} onPress={handleButton} />
      </Container>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#282424",
  },
  circle: {
    position: "absolute",
    marginBottom: height * 0.5,
  },
  timer: {
    position: "absolute",
    marginBottom: height * 0.17,
  },
  buttonContainer: {
    top: "73%",
    position: "absolute",
    alignSelf: "center",
  },
  imageButtonContainer: {
    flexDirection: "row",
    position: "absolute",
    top: "65%",
    justifyContent: "space-between",
    width: width * 0.5,
  },
  iconButton: {
    padding: 10,
  },
  iconImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  phoneButton: {
    marginTop: height * 0.01, // Move the phone button 1% down
  },
});
