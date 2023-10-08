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

  return (
    <View className="flex-1">
      <View className="justify-center px-2 mt-10 -mb-6">
        <MaterialCommunityIcons name="penguin" size={100} color="blue" />
        <Text className="px-4 text-lg font-bold text-blue-700">@{username}</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View>
        <Text>Logout</Text>
      </View>
    </View>
  );
};

export default CustomDrawer;
