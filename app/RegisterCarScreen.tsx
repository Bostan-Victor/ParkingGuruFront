import { StyleSheet, Image } from "react-native";
import { useFetchLocation } from "../src/hooks/useFetchLocation";
import { Text, Container } from "../assets/styles/globalStyles";
import React from "react";
import Header from "../src/components/Header";
import Button from "../src/components/Button";
import Input from "../src/components/InputBox";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "RegisterCar">;

export default function RegsiterCar() {
    const navigation = useNavigation<NavigationProp>();
    const handleButton = () => {
        navigation.navigate("UserParking");
      };

    return (
      <Container> 
        <Header content="Register your car" part={3} />
        <Container style={styles.inputContainer}>
            <Input width={300} height={50} placeholder="Enter your number plate" />
        </Container>
        <Text style={styles.text}>Verify your plate number !</Text>
        <Container style={styles.buttonContainer}>
            <Button content="Park" onPress={handleButton} />
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
    },
    text: {
        position: "absolute",
        top: "40%",
        color: "red",
        alignSelf: "center" // Space between text and button
      },
});
