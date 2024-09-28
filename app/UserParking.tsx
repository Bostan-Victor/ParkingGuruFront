import { StyleSheet, Dimensions,Image  } from "react-native";
import { Container } from "../assets/styles/globalStyles";
import React , {useState} from "react";
import Circle from "../src/components/CarCircle";
import Timer from "../src/components/Timer";
import Button from "../src/components/Button";
import {SwipeButton} from "@arelstone/react-native-swipe-button"


const { width, height } = Dimensions.get("window");

export default function UserParking() {
  const [hasTicket, setHasTicket] = useState(0);
    return (
      <Container style={styles.container}>
        <Container style={styles.circle}>
          <Circle />
        </Container>
        <Container style={styles.timer}>
          <Timer hasTicket={hasTicket} />
        </Container>
        {/* <SwipeButton onComplete={()=>console.log('work') } Icon={<Image
      source={require("../../assets/car.png")}
      style={{ width: 96, height: 96 }}
    />} title={"title"} /> */}
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
