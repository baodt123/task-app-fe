import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import ProjectScreen from "../screens/project/ProjectScreen";
import TaskScreen from "../screens/task/TaskScreen";
import NotificationScreen from "../screens/NotificationScreen";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "blue",
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather name="home" size={26} color={focused ? "blue" : "gray"} />
          ),
        }}
      />
      <Tab.Screen
        name="Project"
        component={ProjectScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="folder1"
              size={26}
              color={focused ? "blue" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Task"
        component={TaskScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="menufold"
              size={26}
              color={focused ? "blue" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="bell"
              size={26}
              color={focused ? "blue" : "gray"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
