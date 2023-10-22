import { useFormik } from "formik";
import { StatusBar } from "expo-status-bar";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { changePasswordUser } from "../../services/user";
import { SafeAreaView } from "react-navigation";
import { ToastAlert } from "../../components/ToastAlert";

const ChangePasswordScreen = ({ navigation }) => {
  

  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <StatusBar style="auto" />
      <View className="flex flex-row items-center justify-between mx-6 ">
        <Text className="text-2xl font-semibold text-blue-700">Profile</Text>
      </View>
      <View className="h-0.5 my-3 bg-gray-200"></View>

      
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
