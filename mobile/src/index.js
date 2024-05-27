import "react-native-gesture-handler";

import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import Routes from "./routes";

console.log("teste");

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
