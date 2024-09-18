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
import ClickableText from "./ClickableText";
import { useNavigation } from "@react-navigation/native"; // Import the useNavigation hook

const { width, height } = Dimensions.get("window");

const RegisterPage: React.FC = () => {
  // State to manage form fields
  const navigation = useNavigation(); // Access the navigation object
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [identityCard, setIdentityCard] = useState("");

  // Submit handler function to log the inputted information in JSON format
  const handleSubmit = () => {
    // Create a JSON object with the form data
    const formData = {
      phoneNumber: phone,
      email: email,
      password: password,
      uid: identityCard,
    };

    // Convert the formData to JSON format
    const jsonFormData = JSON.stringify(formData);
    console.log("Form Data in JSON format:", jsonFormData);
    fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonFormData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  // Handle navigation to Sign In page
  const handleSignInNavigation = () => {
    navigation.navigate; // Navigate to the Login page
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
        <Text style={styles.headerText}>Create{"\n"}Account</Text>
      </View>

      {/* Use the InputForm component */}
      <InputForm
        phone={phone}
        setPhone={setPhone}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        identityCard={identityCard}
        setIdentityCard={setIdentityCard}
        showPhoneInput={true} // Show or hide fields as needed
        showEmailInput={true}
        showPasswordInput={true}
        showIdentityCardInput={true}
        onSubmit={handleSubmit} // Add the onSubmit prop
      />

      {/* Yellow Submit Button - Outside the gray box */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit}>
        <Text style={styles.signUpButtonText}>SIGN UP</Text>
      </TouchableOpacity>

      {/* Use the ClickableText component */}
      <ClickableText
        text="Already have an account? Sign in"
        onPress={handleSignInNavigation}
        highlightText="Sign in"
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

export default RegisterPage;
