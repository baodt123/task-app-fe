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
import DetailScreen from "../screens/project/DetailScreen";
import ProjectHome from "../screens/project/ProjectHome";
import BroadScreen from "../screens/project/BroadScreen";
import MemberScreen from "../screens/project/MemberScreen";
import AddTaskInside from "../screens/task/AddTaskInside";

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
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen name="ProjectHome" component={ProjectHome} />
      <Stack.Screen name="BroadScreen" component={BroadScreen} />
      <Stack.Screen name="MemberScreen" component={MemberScreen} />
      <Stack.Screen name="AddTaskInside" component={AddTaskInside} />
    </Stack.Navigator>
  );
};

export default AuthStack;
