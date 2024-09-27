import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import { Text, Container } from "./../assets/styles/globalStyles";
import InputForm from "./../src/components/InputForm";
import ClickableText from "./../src/components/ClickableText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useLoginUserMutation } from '../src/services/placeApi';
import { storeToken } from './../src/hooks/useToken';  // Correct token handling

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;
const { width, height } = Dimensions.get("window");

const LoginPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleSubmit = async () => {
    const userInfo = {
      username: phone,
      password: password,
    };
    try {
      const response = await loginUser(userInfo).unwrap();

      console.log('Access Token:', response.accessToken);

      if (response.accessToken) {
        try {
          //await storeToken(response.accessToken);  // Store token securely
          await storeToken(response.accessToken);
          navigation.navigate("UserHome");
        } catch (err) {
          console.error('Error storing the token:', err);
        }
      }
    } catch (err) {
      console.error("Error during submission:", err);
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

      <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit}>
        <Text style={styles.signUpButtonText}>LOGIN</Text>
      </TouchableOpacity>

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
