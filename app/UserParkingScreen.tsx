import { StyleSheet, Dimensions, Image, View } from "react-native";
import { Container, Text } from "../assets/styles/globalStyles";
import React, { useState } from "react";
import Circle from "../src/components/CarCircle";
import Timer from "../src/components/Timer";
import { SwipeButton } from "@arelstone/react-native-swipe-button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

const { width, height } = Dimensions.get("window");
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "UserParking">;
export default function UserParking() {
  const navigation = useNavigation<NavigationProp>();
  const [hasTicket, setHasTicket] = useState(1);
  const [address, setAddress] = useState("-");
  const handleButton = () => {
    navigation.navigate("RegisterCar");
  };
  return (
    <Container style={styles.container}>
      <Container style={styles.circle}>
        <Circle />
      </Container>
      <Container style={styles.timer}>
        <Timer hasTicket={hasTicket} initialSeconds={3232} />
      </Container>
        <Text style={styles.address}>Your car address is: {address}</Text>
      <Container style={styles.buttonContainer}>
        <SwipeButton 
          onComplete={() => handleButton()} 
          Icon={
            <Image
              source={require('./../assets/icons8-arrow-96.svg')}
              style={{ width: 40, height: 40 }}
            />
          } 
          title={"End parking"} 
        />
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
    marginBottom: height * 0.17,
  },
  buttonContainer: {
    top: "73%", // Positioning the button vertically
    position: "absolute",
    alignSelf: "center", // Centers the button horizontally
  },
  address: {
    fontSize: 20,
    top: "65%", // Adjusted position for the address text
    position: "absolute",
    color: "white",
    fontWeight: "normal",
    alignSelf: "center", 
  },
});
