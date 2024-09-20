import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Container, Text } from "../../assets/styles/globalStyles"; // Assuming you're using a global styles file

// Get device width and height for dynamic sizing
const { width } = Dimensions.get("window");

export default function Timer({ hasTicket }: { hasTicket: number }) {
  // State to track the elapsed time in seconds
  const [seconds, setSeconds] = useState(0);
  const [price, setPrice] = useState(15);

  // Use useEffect to start a timer when the component mounts
  useEffect(() => {
    if (hasTicket) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000); // Update the timer every second
  
      // Cleanup the interval when the component unmounts
      return () => clearInterval(interval);
    }
  }, [hasTicket]);

  // Function to format seconds into hh:mm:ss
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return (
      String(hours).padStart(2, "0") +
      ":" +
      String(minutes).padStart(2, "0") +
      ":" +
      String(secs).padStart(2, "0")
    );
  };

  return (
    <Container style={styles.container}>
      {/* Display the "Parking time:" label in white */}
      <Text style={styles.labelText}>Parking time:</Text>
      
      {/* Conditionally render the timer or the "No ticket!" text */}
      {hasTicket ? (
        <>
          {/* Display the formatted timer */}
          <Text style={styles.timerText}>{formatTime(seconds)}</Text>

          {/* Display the price with white text */}
          <Text style={styles.priceText}>{price} mdl</Text>
        </>
      ) : (
        <Text style={styles.noTicketText}>No ticket!</Text>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#282424", // Dark background
    justifyContent: "center", // Center the timer vertically
    alignItems: "center", // Center the timer horizontally
  },
  labelText: {
    fontSize: width * 0.05, // Dynamic font size for "Parking time:"
    color: "#fff", // White text
    marginBottom: 10, // Space between label and timer
    fontWeight: "bold",
  },
  timerText: {
    fontSize: width * 0.08, // Dynamic font size for timer
    color: "#fff", // White text for the timer
    fontWeight: "bold",
  },
  priceText: {
    fontSize: width * 0.045, // Dynamic font size for price
    color: "#fff", // White text for the price
    marginTop: 15, // Add some space above the price
    fontWeight: "bold",
  },
  noTicketText: {
    fontSize: width * 0.06, // Dynamic font size for "No ticket!" text
    color: "#F0C10B", // Yellow color for "No ticket!"
    fontWeight: "bold",
  },
});
