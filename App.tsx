// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { theme } from "./assets/styles/theme";
import { ThemeProvider } from "styled-components/native";
import HomeScreen from "./app/HomeScreen";
import Login from "./app/LoginScreen";
import RegisterCar from "./app/RegisterCarScreen";
import Register from "./app/RegisterScreen";
import UserHome from "./app/UserHomeScreen";
import UserParking from "./app/UserParkingScreen";
import VerifyCar from "./app/VerifyCarScreen";
import VerifyPhone from "./app/VerifyPhoneScreen";
import OtpVerify from "./app/OtpVerifyPage"
import PoliceParking from "./app/PoliceParkingScreen";
import Profile from "./app/ProfileScreen";



// Define the types for your routes
export type RootStackParamList = { // Add export keyword here
  Login: undefined;
  Register: undefined;
  Home: undefined;
  RegisterCar: undefined;
  UserHome: undefined;
  UserParking: undefined;
  VerifyCar: undefined;
  VerifyPhone: undefined;
  OtpVerify: undefined; 
  PoliceParking: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const screens = [
    { name: "Home", component: HomeScreen },
    { name: "Register", component: Register },
    { name: "Login", component: Login },
    { name: "RegisterCar", component: RegisterCar },
    { name: "UserHome", component: UserHome },
    { name: "UserParking", component: UserParking },
    { name: "VerifyCar", component: VerifyCar },
    { name: "VerifyPhone", component: VerifyPhone },
    { name: "OtpVerify", component: OtpVerify },
    { name: "PoliceParking", component: PoliceParking },
    { name: "Profile", component: Profile },
  ];

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}
          >
            {screens.map((screen, index) => (
              <Stack.Screen
                key={index}
                name={screen.name as keyof RootStackParamList} // Ensure type safety for route names
                component={screen.component}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}
