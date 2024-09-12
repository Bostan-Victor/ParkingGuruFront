import { StyleSheet, Image } from "react-native";
import { useFetchLocation } from "../src/hooks/useFetchLocation";
import { Text, Container } from "../assets/styles/globalStyles";
import React from "react";
import Header from "../src/components/Header";
import VerifyCar from "./VerifyCar";

export default function HomeScreen() {
  const { locationAddress, price } = useFetchLocation();

  return (
    <VerifyCar/>
  );
}