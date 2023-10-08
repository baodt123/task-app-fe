import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../screens/auth/WelcomeScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import TabNavigator from "../navigation/TabNavigation"; // Import TabNavigator
import DrawerStack from "./DrawerStack";
import ChangePasswordScreen from "../screens/user/ChangePasswordScreen";
import ProfileScreen from "../screens/user/ProfileScreen";
import AddProjectScreen from "../screens/project/AddProjectScreen";
import ProjectScreen from "../screens/project/ProjectScreen";
import ProjectDetailScreen from "../screens/project/ProjectDetailScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="Stack" component={DrawerStack} />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
      />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="ProjectScreen" component={ProjectScreen} />
      <Stack.Screen name="AddProjectScreen" component={AddProjectScreen} />
      <Stack.Screen name="ProjectDetailScreen" component={ProjectDetailScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
