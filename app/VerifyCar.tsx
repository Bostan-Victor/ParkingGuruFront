import { StyleSheet, Image } from "react-native";
import { useFetchLocation } from "../src/hooks/useFetchLocation";
import { Text, Container } from "../assets/styles/globalStyles";
import React from "react";
import Header from "../src/components/Header";
import Button from "../src/components/Button";
import Input from "../src/components/InputBox";
import Login from "../src/components/LoginPage";

export default function HomePage() {
    return (
      <Container> {/* Wrap everything inside a View */}
        <Header content="Verify Car" part={3} />
        <Container style={styles.inputContainer}>
            <Input width={300} height={50} placeholder="Enter your number plate" />
        </Container>
        <Container style={styles.buttonContainer}>
            <Button content="Verify" />
        </Container>
      </Container>
    );
}

const styles = StyleSheet.create({
    // Style for the button container
    buttonContainer: {
        top: "50%", // Positioning the button vertically
        position: "absolute",
        alignSelf: "center", // Centers the button horizontally
    },
    inputContainer: {
        position: "absolute",
        bottom: "60%",
        alignSelf: "center"
    }
});
