import { StyleSheet, Dimensions, TouchableOpacity, View, Image } from "react-native";
import { Container } from "../assets/styles/globalStyles";
import React, { useState, useEffect } from "react";
import Circle from "../src/components/CarCircle";
import Timer from "../src/components/Timer";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import Button from "../src/components/Button";
import { Linking } from "react-native";

const { width, height } = Dimensions.get("window");
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "PoliceParking">;

export default function UserParking() {
  const navigation = useNavigation<NavigationProp>();
  const [hasTicket, setHasTicket] = useState(1);
  const [buttonContent, setButtonContent] = useState("Confirm");

  const handleButton = () => {
    navigation.navigate("UserHome");
  };

  const handleCall = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

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
        <Circle />
      </Container>
      <Container style={styles.timer}>
        <Timer hasTicket={hasTicket} initialSeconds={3232} />
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
