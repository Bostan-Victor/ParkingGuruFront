// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./src/store";
import HomeScreen from "./app/HomeScreen";
import LoginScreen from "./src/components/LoginPage";
import { theme } from "./assets/styles/theme";
import { ThemeProvider } from "styled-components/native";
import RegisterPage from "./src/components/RegisterPage";

const screens = [
  { name: "Login", component: LoginScreen },
  { name: "Home", component: HomeScreen },
  { name: "Register", component: RegisterPage },
];

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            // initialRouteName={screens[0].name}
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}
          >
            {screens.map((screen, index) => (
              <Stack.Screen
                key={index}
                name={screen.name}
                component={screen.component}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}
