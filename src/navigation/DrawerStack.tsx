import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import ProfileScreen from "../screens/user/ProfileScreen";
import TabNavigator from "./TabNavigation";
import SettingScreen from "../screens/SettingScreen";
import { Ionicons } from "@expo/vector-icons";
import CustomDrawer from "../components/CustomDrawer";

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "blue",
        drawerActiveTintColor: "white",
        drawerLabelStyle: {
          marginLeft: -20,
          fontSize: 16,
          fontWeight: "bold",
        },
      }}>
      <Drawer.Screen
        name="Main"
        component={TabNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="md-home" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="md-person-circle-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-sharp" size={24} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerStack;
