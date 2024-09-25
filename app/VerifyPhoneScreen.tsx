import React, { useState } from "react";
import { TouchableOpacity, View, Image, Dimensions, StyleSheet } from "react-native";
import { Text, Container } from "../assets/styles/globalStyles"; // Assuming you have global styles here
import InputForm from "../src/components/InputFormPhone"; // Import the new component
import ClickableText from "../src/components/ClickableText";
import uuid from 'react-native-uuid';

import { usePostDataMutation } from "../src/services/placeApi"; // Import the mutation hook
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App"; // Import the navigation types

const { width, height } = Dimensions.get("window");

// Type for the navigation prop
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "VerifyPhone">;

const RegisterPage: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [Success, setSuccess] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to handle error message
  const navigation = useNavigation<NavigationProp>(); // Initialize typed navigation

  const [postData, { isLoading, isSuccess, isError, error }] = usePostDataMutation();

  // Submit handler function to log the inputted information
  const handleSubmit = async () => {
    setErrorMessage(null); // Reset error message before validation

    if (phone.length < 9) {
      setErrorMessage("Phone number must be exactly 9 digits.");
      return;
    }

    const _uuid = uuid.v4(); // Get the uuid
    const userInfo = {
      phoneNumber: phone,
      uuid: _uuid,
    };
console.log(_uuid)
    try {
      await postData(userInfo); // Call the mutation with userInfo object
      // if (isSuccess) {
      //   // Navigate to the RegisterCar screen upon successful registration
      //   navigation.navigate("RegisterCar");
      // }
      if (Success) {
        // Navigate to the RegisterCar screen upon successful registration
        navigation.navigate("OtpVerify");
      }
    } catch (err) {
      console.error("Error during submission:", err);
    }
  };

  // Handle navigation to Sign In page
  const handleSignInNavigation = () => {
    navigation.navigate("Login");
  };

  return (
    <Container style={styles.container}>
      {/* Container for the car on the left */}
      <View style={styles.carContainer}>
        <Image source={require("./../assets/car-bg.png")} style={styles.carImage} />
      </View>

      {/* Container for the text on the right */}
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>
          Create{"\n"}Account
        </Text>
      </View>

      {/* Input Form for Phone Number */}
      <View style={styles.inputFromContainer}>
        <InputForm phone={phone} setPhone={setPhone} />
      </View>

      {/* Display error message if validation fails */}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      {/* Yellow Submit Button - Outside the gray box */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit} disabled={isLoading}>
        <Text style={styles.signUpButtonText}>{isLoading ? "Loading..." : "SIGN UP"}</Text>
      </TouchableOpacity>

      {/* Use the ClickableText component */}
      <ClickableText text="Already have an account? Sign in" onPress={handleSignInNavigation} highlightText="Sign in" />

      {/* Error or Success messages from API submission */}
      {isError && (
        <Text style={{ color: "red" }}>
          Error: {"data" in error ? (error.data as { message: string }).message : "Submission failed"}
        </Text>
      )}
      {isSuccess && <Text style={{ color: "green" }}>Registration successful!</Text>}
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
    width: width * 0.35,
    height: width * 0.35,
    resizeMode: "contain",
  },
  textContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: width * 0.1,
    paddingBottom: height * 0.02,
    alignItems: "center",
  },
  headerText: {
    fontSize: width * 0.1,
    fontWeight: "bold",
    color: "#F0C10B",
  },
  signUpButton: {
    backgroundColor: "#F0C10B",
    paddingVertical: height * 0.02,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: width * 0.15,
    marginTop: height * 0.02,
  },
  signUpButtonText: {
    color: "#000",
    fontSize: width * 0.045,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: width * 0.04,
    marginTop: height * 0.01,
    textAlign: "center",
  },
  inputFromContainer: {
    padding: 50,
  },
});

export default RegisterPage;
