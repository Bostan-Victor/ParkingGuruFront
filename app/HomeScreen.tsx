import { StyleSheet, Image } from "react-native";
import { useFetchLocation } from "../src/hooks/useFetchLocation";
import { Text, Container } from "../assets/styles/globalStyles";
import React from "react";
import Header from "../src/components/ProfilePagePolice";

export default function HomeScreen() {
  const { locationAddress, price } = useFetchLocation();

  return <Header />;
}
