import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import { Text, Container } from "../assets/styles/globalStyles"; // Assuming you have global styles here
import InputForm from "../src/components/InputForm"; // Import the new component
import ClickableText from "../src/components/ClickableText";
import { usePostDataMutation } from '../src/services/placeApiregister'; // Import the mutation hook
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import uuid from 'react-native-uuid';
import { storeToken } from './../src/hooks/useToken';



const { width, height } = Dimensions.get("window"); // Get screen width and height
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Register">;

const RegisterPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message
  const [token, setToken] = useState("");

  const [postData, { isLoading, isSuccess, isError, error }] = usePostDataMutation();

  // Submit handler function to log the inputted information
  const handleSubmit = async () => {
    // Validate required fields
    if (!firstName || !lastName || !email || !password || !phone) {
      setErrorMessage("All fields are required.");
      return; // Do not proceed with the request
    }

    const _uuid = uuid.v4(); // Generate UUID
    const userInfo = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      phoneNumber: phone,
      uuid: _uuid,
    };

    try {
      const response = await postData(userInfo).unwrap(); // Execute login request
      console.log(response);

      if (response.accessToken) {
        try {
          await storeToken(response.accessToken);  // Store token securely
          navigation.navigate("OtpVerify");  // Navigate to home screen on success
        } catch (err) {
          console.error('Error storing the token:', err);
          setErrorMessage("Unable to store token. Please try again.");
        }
      }
    } catch (err) {
      console.error("Error during submission:", err);  // Print the error in case of failure
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
        <Image
          source={require("./../assets/car-bg.png")} // Add your car image here
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
        showPhoneInput={true}
        showEmailInput={true}
        showPasswordInput={true}
        onSubmit={handleSubmit}
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
      {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}
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
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: width * 0.1,
    paddingTop: height * 0.05,
    alignItems: "center",
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
});

export default RegisterPage;
