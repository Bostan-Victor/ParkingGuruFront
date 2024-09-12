import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import { Text, Container } from "../../assets/styles/globalStyles"; // Assuming you have global styles here

const { width, height } = Dimensions.get("window"); // Get screen width and height

const RegisterPage: React.FC = () => {
  // State to manage form fields
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [identityCard, setIdentityCard] = useState("");

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

      {/* Form section with grey background and rounded corners */}
      <View style={styles.formContainer}>
        {/* Phone number field */}
        <View style={styles.inputGroup}>
          <View style={styles.phoneInputContainer}>
            <TextInput
              style={styles.phoneInput}
              placeholder="Phone number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        </View>

        {/* Email field */}
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        {/* Password field */}
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        {/* Identity Card field */}
        <View style={styles.inputGroup}>
          <View style={styles.identityCardContainer}>
            <TextInput
              style={styles.identityInput}
              placeholder="Identity card"
              value={identityCard}
              onChangeText={setIdentityCard}
            />
            <Text style={styles.optionalText}>Optional</Text>
          </View>
        </View>
      </View>

      {/* Sign-up Button - Now outside the grey box */}
      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>SIGN UP</Text>
      </TouchableOpacity>
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
  formContainer: {
    backgroundColor: "#404040", // Gray background for form
    borderRadius: 15, // Rounded corners
    marginHorizontal: width * 0.05, // Dynamic horizontal margin
    paddingVertical: height * 0.02, // Internal padding for form
    paddingHorizontal: width * 0.05, // Dynamic padding based on screen width
    alignSelf: "center", // Center the form horizontally
    justifyContent: "center", // Ensure the form grows only with the content
  },
  inputGroup: {
    marginBottom: height * 0.03, // Dynamic margin between inputs
    width: width * 0.8,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  prefix: {
    padding: 10,
    backgroundColor: "#B0B0B0",
    borderRadius: 5,
    color: "#000",
    fontWeight: "bold",
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#000", // Black underline for inputs
    padding: 10,
    color: "#fff",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#000", // Black underline for inputs
    padding: 10,
    color: "#fff",
  },
  identityCardContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  identityInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#000", // Black underline for inputs
    padding: 10,
    color: "#fff",
  },
  optionalText: {
    marginLeft: 10,
    backgroundColor: "#B0B0B0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    color: "#000",
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
