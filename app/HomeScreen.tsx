import { StyleSheet, Image } from "react-native";
import { useFetchLocation } from "../src/hooks/useFetchLocation";
import { Text, Container } from "../assets/styles/globalStyles";
import React, { useEffect } from "react";
import { storeToken, getToken, deleteToken } from './../src/hooks/useToken';
import Register from "./RegisterScreen";
import { useFetchIsUserPoliceMutation } from './../src/services/placeApi';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const [fetchIsUserPolice, { data: response, error, isLoading }] = useFetchIsUserPoliceMutation();
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    fetchIsUserPolice({});
  }, []);

  useEffect(() => {
    if (response) {
      const isSuccess = response.data?.isUserPolice.success;
      const reservation = response.data?.isUserPolice.reservation;

      if (isSuccess === true) {
        navigation.navigate("VerifyCar");
      } 
      if (isSuccess === false && reservation === null) {
        //navigation.navigate("UserHome");
        navigation.navigate("OtpVerify");
      } 
      if (isSuccess === false && reservation !== null) {
        navigation.navigate("UserParking");
      }
    }

    if (error) {
      navigation.navigate("RegisterCar");
    }
  }, [response, error]);

  return (
    <Register/>
  );
}
