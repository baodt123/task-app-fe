import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
// @ts-ignore
const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <View className="flex flex-row items-center justify-between mx-6 ">
        <Text className="text-2xl font-semibold text-blue-700">Home</Text>
        <Feather name="search" size={30} color="blue" />
      </View>
      <View className="h-0.5 my-3 bg-gray-200"></View>
      <View className="mx-6">
        <Text>All projects</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
