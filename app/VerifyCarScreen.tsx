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

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "VerifyCar">;


export default function HomePage() {
    const navigation = useNavigation<NavigationProp>();
    const handleButton = () => {
        navigation.navigate("PoliceParking");
      };
    // const useFetchLocation
    return (
      <Container> {/* Wrap everything inside a View */}
        <Header content="Verify Car" part={3} />
        <Container style={styles.inputContainer}>
            <Input width={300} height={50} placeholder="Enter your number plate" />
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
