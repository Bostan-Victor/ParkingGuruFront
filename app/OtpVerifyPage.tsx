import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import { Text, Container } from "../assets/styles/globalStyles"; // Assuming you have global styles here
import ClickableText from "../src/components/ClickableText"; // Importing the ClickableText component
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App"; // Import the navigation types
import { useGetUserProfileMutation, useGenerateOTPMutation } from "./../src/services/placeApi";

const { width, height } = Dimensions.get("window"); // Get screen width and height
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "OtpVerify">;

const VerifyPage: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState(""); // State to manage OTP input
  const navigation = useNavigation<NavigationProp>();

  // Hooks for fetching user profile and generating OTP
  const [getUserProfile, { data, error, isLoading }] = useGetUserProfileMutation();
  const [generateOTP, { data: otpData, error: otpError, isLoading: otpLoading }] = useGenerateOTPMutation();

  // Function to fetch user profile
  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile({});
      const userPhone = response.data?.data.getUserProfile.phoneNumber;
      if (userPhone) {
        setPhone(userPhone);
        console.log("User phone number:", userPhone);
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  // Function to generate OTP after phone is set
  const handleGenerateOTP = async (userPhone: string) => {
    try {
      const responseOTP = await generateOTP(userPhone);
      console.log("OTP response:", responseOTP);
    } catch (err) {
      console.error("Error generating OTP:", err);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchUserProfile(); // Fetch user profile first
    };
    init();
  }, []);

  // Generate OTP once phone number is set
  useEffect(() => {
    if (phone) {
      handleGenerateOTP(phone); // Call generateOTP only after phone number is set
    }
  }, [phone]);

  const handleResendOTP = async () => {
    console.log("Resend OTP clicked");
    await handleGenerateOTP(phone); // Resend OTP using the existing phone number
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
        <Text style={styles.headerText}>Verify</Text>
      </View>

      {/* Centered content for OTP */}
      <View style={styles.centerContent}>
        {/* OTP Instruction */}
        <Text style={styles.otpText}>
          We have sent an OTP on your number {phone}
        </Text>

        {/* OTP Input Field */}
        <TextInput
          style={styles.otpInput}
          placeholder="Enter OTP"
          placeholderTextColor="#aaa"
          keyboardType="number-pad"
          value={otp}
          onChangeText={setOtp}
          maxLength={6} // Limiting the OTP to 6 digits
        />

        {/* Resend OTP Link */}
        <ClickableText
          text="Didn't receive the code? Resend OTP"
          highlightText="Resend OTP"
          onPress={handleResendOTP}
        />
      </View>

      {/* Yellow Submit Button - Outside the gray box */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleResendOTP}>
        <Text style={styles.signUpButtonText}>{"Verify"}</Text>
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
    color: "#F0C10B", // Yellow color for "Verify"
  },
  instructionContainer: {
    marginTop: height * 0.02,
    alignItems: "center",
  },
  centerContent: {
    flex: 1,
    alignItems: "center", // Center horizontally
  },
  otpText: {
    fontSize: width * 0.045, // Dynamic font size based on screen width
    color: "#fff", // White text color
    width: "70%",
  },
  otpInput: {
    backgroundColor: "#404040",
    borderRadius: 5,
    width: width * 0.8,
    color: "#fff",
    textAlign: "center",
    paddingVertical: height * 0.02,
    marginVertical: height * 0.02,
    fontSize: width * 0.045, // Dynamic font size
    borderBottomWidth: 1,
    borderBottomColor: "#F0C10B", // Yellow underline
  },
  signUpButton: {
    backgroundColor: "#F0C10B",
    paddingVertical: height * 0.02, // Dynamic vertical padding
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: width * 0.15, // Set button width smaller than input boxes
    marginBottom: height * 0.4, // Dynamic margin based on screen height
  },
  signUpButtonText: {
    color: "#000",
    fontSize: width * 0.045, // Dynamic font size
    fontWeight: "bold",
  },
});

export default VerifyPage;
