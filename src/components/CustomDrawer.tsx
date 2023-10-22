import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, BackHandler } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { FontAwesome5 } from "@expo/vector-icons";
import { getUserInfo } from "../services/user";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import Line from "./Line";

const CustomDrawer = (props) => {
  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      getUserInfo()
        .then((response) => {
          setName(response.data.username);
          setFullName(response.data.fullName);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return () => unsubscribe();
  }, [props.navigation]);

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("accessToken");
      axios.defaults.headers.common["Authorization"] = null;
    } catch (error) {
      console.log("error when remove token", error);
    }
    props.navigation.navigate("LoginScreen");
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Exit", "Are you sure to log out?", [
        {
          text: "No",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Yes", onPress: handleLogout },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View className="flex-1">
      <View className="flex flex-row px-2 mt-10 ml-2 -mb-6">
        <FontAwesome5 name="user-astronaut" size={100} color="blue" />
        <View className="flex flex-col items-start justify-center">
          <Text className="px-4 text-lg font-bold ">{fullName}</Text>
          <Text className="px-4 text-base font-base ">@{name}</Text>
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Line />
      <TouchableOpacity onPress={handleLogout} style={{ paddingVertical: 15 }}>
        <View className="flex flex-row px-4">
          <FontAwesome5 name="sign-out-alt" size={24} color="black" />
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
