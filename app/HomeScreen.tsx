import { useFetchLocation } from "../src/hooks/useFetchLocation";
import React from "react";
import Header from "../src/components/LoginPage";

export default function HomeScreen() {
  const { locationAddress, price } = useFetchLocation();

  return <Header />;
}
