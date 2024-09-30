import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Text, Container } from "./../assets/styles/globalStyles";
import InputForm from "./../src/components/InputForm";
import ClickableText from "./../src/components/ClickableText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useLoginUserMutation } from '../src/services/placeApiregister';
import { storeToken } from './../src/hooks/useToken';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;
const { width, height } = Dimensions.get("window");

const LoginPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Add error state

  const [loginUser, { isLoading }] = useLoginUserMutation(); // Use isLoading to control loading state

  const handleSubmit = async () => {
    const userInfo = {
      username: phone,
      password: password,
    };
    
    setErrorMessage(null); // Reset error message before new request

    try {
      const response = await loginUser(userInfo).unwrap(); // Execute login request
      console.log(response);

      if (response.accessToken) {
        try {
          await storeToken(response.accessToken);  // Store token securely
          navigation.navigate("UserHome");  // Navigate to home screen on success
        } catch (err) {
          console.error('Error storing the token:', err);
          setErrorMessage("Unable to store token. Please try again.");
        }
      }
    } catch (err) {
      console.error("Error during submission:", err);
      setErrorMessage("Login failed. Please check your credentials and try again.");
    }
  };

  const handleSignUpNavigation = () => {
    navigation.navigate("Register");
  };

  return (
    <Container style={styles.container}>
      <View style={styles.carContainer}>
        <Image
          source={require("./../assets/car-bg.png")}
          style={styles.carImage}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Welcome{"\n"}Back</Text>
      </View>

      <InputForm
        phone={phone}
        setPhone={setPhone}
        password={password}
        setPassword={setPassword}
        showPhoneInput={true}
        showEmailInput={false}
        showPasswordInput={true}
        showFirstNameInput={false}
        showLastNameInput={false}
        onSubmit={handleSubmit}
      />

      <TouchableOpacity 
        style={styles.signUpButton} 
        onPress={handleSubmit} 
        disabled={isLoading}  // Disable button when loading
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#000" />  // Show loader when loading
        ) : (
          <Text style={styles.signUpButtonText}>LOGIN</Text>
        )}
      </TouchableOpacity>

      {errorMessage && (
        <Text style={{ color: 'red', marginTop: 10 }}>{errorMessage}</Text>  // Show error message if any
      )}

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
    backgroundColor: "#282424",
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

export default LoginPage;
