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
import DeviceInfo from 'react-native-device-info';
import { usePostDataMutation } from '../services/placeApi'; // Import the mutation hook
import { useNavigation } from "@react-navigation/native"; // Import the useNavigation hook

const { width, height } = Dimensions.get("window"); // Get screen width and height

const RegisterPage: React.FC = () => {
  // State to manage form fields
  const navigation = useNavigation(); // Access the navigation object
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hook from RTK Query to handle the POST request
  const [postData, { isLoading, isSuccess, isError, error }] = usePostDataMutation();

  // Submit handler function to log the inputted information
  const handleSubmit = async () => {
    const uuid = DeviceInfo.getApplicationName(); // Get the uuid
    const userInfo = {
      email: email,       // Use email field here
      phoneNumber: phone, // Use phone field here
      password: password,
      uuid: uuid,         // Use the uuid obtained from DeviceInfo
      firstName: firstName,
      lastName: lastName,
    };
    try {
      await postData(userInfo); // Call the mutation with userInfo object
    } catch (err) {
      console.error("Error during submission:", err);
    }
  };

  // Handle navigation to Sign In page
  const handleSignInNavigation = () => {
    console.log("Navigating to Sign In Page");
    // Add your navigation logic here (e.g., navigation.navigate('SignInPage'))
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
        lastName={lastName}
        setLastName={setLastName}
        firstName={firstName}
        setFirstName={setFirstName}
        showPhoneInput={true} // Show or hide fields as needed
        showEmailInput={true}
        showPasswordInput={true}
        onSubmit={handleSubmit} // Add the onSubmit prop
      />

      {/* Yellow Submit Button - Outside the gray box */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit} disabled={isLoading}>
        <Text style={styles.signUpButtonText}>
          {isLoading ? 'Loading...' : 'SIGN UP'}
        </Text>
      </TouchableOpacity>

      {/* Use the ClickableText component */}
      <ClickableText
        text="Already have an account? Sign in"
        onPress={handleSignInNavigation}
        highlightText="Sign in"
      />

      {/* Error or Success messages */}
      {isError && (
        <Text style={{ color: 'red' }}>
          Error: {'data' in error ? (error.data as { message: string }).message : 'Submission failed'}
        </Text>
      )}
      {isSuccess && <Text style={{ color: 'green' }}>Registration successful!</Text>}
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
