import { StyleSheet, Dimensions, Image } from "react-native";
import { Container, Text } from "../assets/styles/globalStyles";
import React, { useState, useEffect } from "react";
import Circle from "../src/components/CarCircle";
import Timer from "../src/components/Timer";
import { SwipeButton } from "@arelstone/react-native-swipe-button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useGetReservationMutation, useEndReservationMutation } from './../src/services/placeApi';
// import Navbar from "./../src/components/NavBar"; // Commenting out Navbar import

const { width, height } = Dimensions.get("window");
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "UserParking">;

export default function UserParking() {
  const navigation = useNavigation<NavigationProp>();
  const [hasTicket, setHasTicket] = useState(1);
  const [address, setAddress] = useState("-");
  const [plate, setPlate] = useState("");
  const [time, setTime] = useState(0);
  const [loading, setLoading] = useState(true); // Add loading state
  const [getReservation, { data, error }] = useGetReservationMutation();
  const [endReservation] = useEndReservationMutation();

  const handleButton = async () => {
    try {
      const result = await endReservation({}).unwrap();
      console.log('Reservation ended:', result);
    } catch (error) {
      console.error('Error ending reservation:', error);
    }
    navigation.navigate("UserHome");
  };

  const handleReservation = async () => {
    try {
      const result = await getReservation({}).unwrap();
      if (result.data?.getActiveReservation.reservation) {
        setPlate(result.data.getActiveReservation.reservation.plateNumber);
        setAddress(result.data.getActiveReservation.reservation.address);
        setTime(result.data.getActiveReservation.elapsedTime); 
      } else {
        console.log('No active reservation found');
      }
    } catch (err) {
      console.error('Error fetching reservation:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    handleReservation();
  }, []);

  const handleBackPress = () => {
    navigation.navigate("UserHome");
  };

  const handleProfilePress = () => {
    navigation.navigate("Profile");
  };

  return (
    <Container style={styles.container}>
      {/* <Navbar onBackPress={handleBackPress} onProfilePress={handleProfilePress} /> */}
      <Container style={styles.circle}>
        <Circle plate={plate} />
      </Container>
      {!loading && ( // Only render the Timer when loading is false
        <Container style={styles.timer}>
          <Timer hasTicket={hasTicket} initialSeconds={time} />
        </Container>
      )}
      <Text style={styles.address}>Your car address is: {address}</Text>
      <Container style={styles.buttonContainer}>
        <SwipeButton
          onComplete={handleButton}
          Icon={
            <Image
              source={require('./../assets/icons8-arrow-96.svg')}
              style={{ width: 40, height: 40 }}
            />
          }
          title={"Slide to end parking"}
          underlayStyle={{ backgroundColor: '#282424' }} 
          goBackToStart={true}
        />
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
  address: {
    fontSize: 20,
    top: "65%",
    position: "absolute",
    color: "white",
    fontWeight: "normal",
    alignSelf: "center", 
  },
});
