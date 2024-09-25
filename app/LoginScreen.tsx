import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import { Text, Container } from "./../assets/styles/globalStyles"; // Assuming you have global styles here
import InputForm from "./../src/components/InputForm"; // Import the InputForm component
import ClickableText from "./../src/components/ClickableText"; // Import the ClickableText component
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;
const { width, height } = Dimensions.get("window");

const LoginPage: React.FC = () => {
  // Access the navigation object to enable navigation between screens
  const navigation = useNavigation<NavigationProp>();

  // State to manage form fields
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // Submit handler function to log the inputted information
  const handleSubmit = () => {
    if (phone && password) {
      console.log("Phone:", phone);
      console.log("Password:", password);
      // Handle login logic here (e.g., API call for authentication)
    } else {
      console.log("Please fill in all fields");
    }
  };

  // Navigate to the Register page
  const handleSignUpNavigation = () => {
    navigation.navigate("Register"); // Navigate to the Register page
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
        <Text style={styles.headerText}>Welcome{"\n"}Back</Text>
      </View>

      {/* InputForm for phone number and password */}
      <InputForm
        phone={phone}
        setPhone={setPhone}
        password={password}
        setPassword={setPassword}
        showPhoneInput={true}
        showEmailInput={false} // Hiding email field for the login page
        showPasswordInput={true}
        showFirstNameInput={false}
        showLastNameInput={false}
        onSubmit={handleSubmit}
      />

      {/* Yellow Sign In Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit}>
        <Text style={styles.signUpButtonText}>LOGIN</Text>
      </TouchableOpacity>

      {/* ClickableText for navigating to the Register page */}
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: width * 0.1,
    paddingTop: height * 0.05,
    alignItems: "center",
  },
  carImage: {
    width: width * 0.35, // Adjust the size dynamically based on the screen width
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
    fontSize: width * 0.1, // Dynamic font size based on screen width
    fontWeight: "bold",
    color: "#F0C10B", // Yellow color for "Welcome Back"
  },
  signUpButton: {
    backgroundColor: "#F0C10B", // Yellow button background
    paddingVertical: height * 0.02, // Dynamic vertical padding
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: width * 0.15,
    marginTop: height * 0.02, // Dynamic top margin
  },
  signUpButtonText: {
    color: "#000",
    fontSize: width * 0.045, // Dynamic font size for the button text
    fontWeight: "bold",
  },
});

export default LoginPage;