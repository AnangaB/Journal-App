import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/src/screens/Home/HomeScreen";
import CreateNewEntryScreen from "@/src/screens/AddNewEntry/CreateNewEntryScreen";
import { DefaultTheme, PaperProvider } from "react-native-paper";

const Stack = createNativeStackNavigator();

export default function Index() {
  const theme = {
    ...DefaultTheme,
    // Specify custom property
    myOwnProperty: true,
    // Specify custom property in nested object
    colors: {
      ...DefaultTheme.colors,
      primary: "#6200ee", // Custom primary color
      background: "#f6f6f6", // Custom background color
      text: "#333333", // Custom text color
      // Remove all other default colors by not including them
    },
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Entry Page"
            component={CreateNewEntryScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
