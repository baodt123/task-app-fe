import React, { useEffect, useState, createContext } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getUserInfo } from "../services/user";
import { getAccessToken } from "../services/auth";
import * as SecureStore from "expo-secure-store";

const CustomDrawer = (props) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        setUsername(response.data.username);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("accessToken");
    } catch (error) {
      console.log("error when remove token", error);
    }
    props.navigation.navigate("LoginScreen");
  };
  return (
    <View className="flex-1">
      <View className="justify-center px-2 mt-10 -mb-6">
        <MaterialCommunityIcons name="penguin" size={100} color="blue" />
        <Text className="px-4 text-lg font-bold text-blue-700">
          @{username}
        </Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View className="h-0.5 bg-gray-200"></View>
      <TouchableOpacity onPress={handleLogout} style={{ paddingVertical: 15 }}>
        <View className="flex flex-row px-4">
          <MaterialCommunityIcons name="logout" size={24} color="black" />
          <Text
            style={{
              fontSize: 16,
              marginLeft: 5,
              fontWeight: "bold",
            }}>
            Logout
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomDrawer;
