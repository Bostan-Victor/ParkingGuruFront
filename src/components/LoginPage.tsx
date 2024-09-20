import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import { Text, Container } from "../../assets/styles/globalStyles"; // Assuming you have global styles here
import InputForm from "./InputForm"; // Import the new component
import ClickableText from "./ClickableText"; // Import the ClickableText component

const { width, height } = Dimensions.get("window");

const LoginPage: React.FC = () => {
  // State to manage form fields
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // Submit handler function to log the inputted information
  const handleSubmit = () => {
    console.log("Phone:", phone);
    console.log("Password:", password);
  };

  // Handle navigation to Sign Up page
  const handleSignUpNavigation = () => {
    console.log("Navigating to Sign Up Page");
    // Add your navigation logic here (e.g., navigation.navigate('SignUpPage'))
  };

  return (
    <Container style={styles.container}>
      {/* Container for the car on the left */}
      <View style={styles.carContainer}>
        <Image
          source={require("../../assets/car-bg.png")} // Add your car image here
          style={styles.carImage}
        />
      </View>

      {/* Container for the text on the right */}
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Welcome{"\n"}Back</Text>
      </View>

      {/* Use the InputForm component */}
      <InputForm
        phone={phone}
        setPhone={setPhone}
        password={password}
        setPassword={setPassword}
        showPhoneInput={true} // Show or hide fields as needed
        showEmailInput={true}
        showPasswordInput={false}
        onSubmit={handleSubmit} // Add the onSubmit prop
      />

      {/* Yellow Submit Button - Outside the gray box */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit}>
        <Text style={styles.signUpButtonText}>SIGN IN</Text>
      </TouchableOpacity>

      {/* Use the ClickableText component */}
      <ClickableText
        text="Don't have an account? Sign up"
        onPress={handleSignUpNavigation}
        highlightText="Sign up"
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#282424", // Dark background
  },
  carContainer: {
    width: "100%", // Full width of the screen
    flexDirection: "row", // Place image to the left
    justifyContent: "flex-end", // Align the car image to the left
    paddingHorizontal: width * 0.1, // Dynamic padding based on screen width
    paddingTop: height * 0.05, // Dynamic padding based on screen height
    alignItems: "center", // Vertically center the image
  },
  carImage: {
    width: width * 0.35, // Adjust as necessary based on screen width
    height: width * 0.35, // Maintain the aspect ratio
    resizeMode: "contain",
  },
  textContainer: {
    width: "100%", // Full width of the screen
    flexDirection: "row", // Place text on the right
    justifyContent: "flex-start", // Align the text to the right
    paddingHorizontal: width * 0.1, // Dynamic padding based on screen width
    paddingBottom: height * 0.02, // Dynamic padding based on screen height
    alignItems: "center", // Vertically center the text
  },
  headerText: {
    fontSize: width * 0.1, // Dynamic font size based on screen width
    fontWeight: "bold",
    color: "#F0C10B", // Yellow color for "Create Account"
  },
  signUpButton: {
    backgroundColor: "#F0C10B",
    paddingVertical: height * 0.02, // Dynamic vertical padding
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: width * 0.15, // Set button width smaller than input boxes
    marginTop: height * 0.02, // Dynamic margin based on screen height
  },
  signUpButtonText: {
    color: "#000",
    fontSize: width * 0.045, // Dynamic font size
    fontWeight: "bold",
  },
});

export default LoginPage;
