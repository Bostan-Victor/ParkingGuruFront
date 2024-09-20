import { StyleSheet, Dimensions } from "react-native";
import { Container } from "../assets/styles/globalStyles";
import React , {useState} from "react";
import Circle from "../src/components/CarCircle";
import Timer from "../src/components/Timer";
import Button from "../src/components/Button";


const { width, height } = Dimensions.get("window");

export default function PoliceParking({ hasTicket }: { hasTicket: number }) {
    const buttonText = hasTicket === 0 ? "Fee" : "Confirm";
    return (
      <Container style={styles.container}>
        <Container style={styles.circle}>
          <Circle />
        </Container>
        <Container style={styles.timer}>
          <Timer hasTicket={hasTicket} />
        </Container>
        <Container style={styles.buttonContainer}>
            <Button content={buttonText} />
        </Container>
      </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center", // Center vertically
        alignItems: "center", // Center horizontally
        backgroundColor: "#282424", // Dark background for the page
    },
    circle: {
        position: "absolute", // Position it absolutely within the container
        marginBottom: height * 0.5,
    },
    timer: {
        position: "absolute", // Position it absolutely
    },
    buttonContainer: {
        top: "70%", // Positioning the button vertically
        position: "absolute",
        alignSelf: "center", // Centers the button horizontally
    },
});
