import { StyleSheet, Image, Platform } from "react-native";
import { useFetchLocation } from "../src/hooks/useFetchLocation";
import { Text, Container } from "../assets/styles/globalStyles";
import React, { useState } from "react";
import Header from "../src/components/Header";
import Button from "../src/components/Button";
import Input from "../src/components/InputBox";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useGetActiveReservationByPlateMutation } from "./../src/services/placeApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "VerifyCar">;


export default function HomePage() {
    const navigation = useNavigation<NavigationProp>();
    const [plate, setPlate] = useState("");
    const [getActiveReservationByPlate, { data, error, isLoading }] = useGetActiveReservationByPlateMutation();
    
    const storeplate = async (plateNumber: string) => {
        try {
          if (Platform.OS === 'web') {
            await AsyncStorage.setItem('plateNumber', plateNumber);
          } else {
            await SecureStore.setItemAsync('plateNumber', plateNumber);
          }
        } catch (error) {
          console.error("Error storing token", error);
        }
      };

    const handleButton = async () => {
        try {
            const response = await getActiveReservationByPlate(plate);
            console.log(response);
            storeplate(plate);
          } catch (err) {
            console.error("Error fetching reservation:", err);
          }
        navigation.navigate("PoliceParking");
      }
    // const useFetchLocation
    return (
      <Container> {/* Wrap everything inside a View */}
        <Header content="Verify Car" part={3} />
        <Container style={styles.inputContainer}>
            <Input 
          width={300}
          height={50} 
          placeholder="Enter the number plate" 
          value={plate} 
          onChangeText={setPlate} 
        />
        </Container>
        <Container style={styles.buttonContainer}>
            <Button content="Verify" onPress={handleButton}/>
        </Container>
      </Container>
    );
}

const styles = StyleSheet.create({
    // Style for the button container
    buttonContainer: {
        top: "45%", // Positioning the button vertically
        position: "absolute",
        alignSelf: "center", // Centers the button horizontally
    },
    inputContainer: {
        position: "absolute",
        bottom: "63%",
        alignSelf: "center"
    }
});
