import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/src/screens/Home/HomeScreen";
import CreateNewEntryScreen from "@/src/screens/AddNewEntry/CreateNewEntryScreen";

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
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
  );
}
