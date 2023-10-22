import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../screens/auth/WelcomeScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import DrawerStack from "./DrawerStack";
import ProfileScreen from "../screens/user/ProfileScreen";
import AddProjectScreen from "../screens/project/AddProjectScreen";
import ProjectScreen from "../screens/project/ProjectScreen";
import DetailScreen from "../screens/project/DetailScreen";
import BroadScreen from "../screens/project/broad/BroadScreen";
import MemberScreen from "../screens/project/member/MemberScreen";
import AddTaskInside from "../screens/project/broad/AddTaskInside";
import AddMemberScreen from "../screens/project/member/AddMemberScreen";
import DetailTask from "../screens/project/broad/DetailTask";
import NewMemberScreen from "../screens/project/broad/NewMemberScreen";
import AddTaskOutside from "../screens/task/AddTaskOutside";
import ProjectSearch from "../screens/task/ProjectSearch";
import EnrollUser from "../screens/project/EnrollUser";


const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="Stack" component={DrawerStack} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="ProjectScreen" component={ProjectScreen} />
      <Stack.Screen name="AddProjectScreen" component={AddProjectScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen name="BroadScreen" component={BroadScreen} />
      <Stack.Screen name="MemberScreen" component={MemberScreen} />
      <Stack.Screen name="AddTaskInside" component={AddTaskInside} />
      <Stack.Screen name="AddMemberScreen" component={AddMemberScreen} />
      <Stack.Screen name="DetailTask" component={DetailTask} />
      <Stack.Screen name="NewMemberScreen" component={NewMemberScreen} />
      <Stack.Screen name="AddTaskOutside" component={AddTaskOutside} />
      <Stack.Screen name="ProjectSearch" component={ProjectSearch} />
      <Stack.Screen name="EnrollUser" component={EnrollUser} />
    </Stack.Navigator>
  );
};

export default AuthStack;
