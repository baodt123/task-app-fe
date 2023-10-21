import { useFormik } from "formik";
import * as Yup from "yup";
import { StatusBar } from "expo-status-bar";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { changePasswordUser } from "../../services/user";
import { SafeAreaView } from "react-navigation";
import { ToastAlert } from "../../components/ToastAlert";

const ChangePasswordScreen = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const handleChange = async () => {
    const changeData = { oldPassword, newPassword };
    if (!changeData.oldPassword) {
      ToastAlert("error", "Error", "Password is required!");
      return;
    }

    if (changeData.oldPassword.length < 8) {
      ToastAlert(
        "error",
        "Error",
        "Password must be at least 8 characters long!"
      );
      return;
    }

    if (!changeData.newPassword) {
      ToastAlert("error", "Error", "New password is required!");
      return;
    }

    if (changeData.newPassword.length < 8) {
      ToastAlert(
        "error",
        "Error",
        "Password must be at least 8 characters long!"
      );
      return;
    }

    if (!rePassword) {
      ToastAlert("error", "Error", "Confirm password is required!");
      return;
    }

    if (rePassword !== changeData.newPassword) {
      ToastAlert("error", "Error", "Confirm password do not match!");
      return;
    }
    try {
      await changePasswordUser(changeData);
      ToastAlert("success", "Success", "Change password success!");
      navigation.navigate("Profile");
    } catch (error) {
      ToastAlert("error", "Error", "Error updating user info");
    }
  };

  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <StatusBar style="auto" />
      <View className="flex flex-row items-center justify-between mx-6 ">
        <Text className="text-2xl font-semibold text-blue-700">Profile</Text>
      </View>
      <View className="h-0.5 my-3 bg-gray-200"></View>

      <View className="mx-6 ">
        <View className="px-4 mb-4">
          <Text className="text-xl font-semibold">Change your password</Text>
        </View>
        <View className="flex flex-row items-center w-full h-12 px-4 mb-4 bg-gray-100 border-b border-gray-400">
          <TextInput
            className="flex-grow font-bold"
            placeholder="Old password"
            value={oldPassword}
            secureTextEntry={!showOldPassword}
            onChangeText={setOldPassword}
          />
          <TouchableOpacity
            onPress={() => setShowOldPassword(!showOldPassword)}>
            {showOldPassword ? (
              <Ionicons name="eye-off" size={24} color="blue" />
            ) : (
              <Ionicons name="eye" size={24} color="gray" />
            )}
          </TouchableOpacity>
        </View>

        <View className="flex flex-row items-center w-full h-12 px-4 mb-4 bg-gray-100 border-b border-gray-400">
          <TextInput
            className="flex-grow font-bold"
            placeholder="New password"
            value={newPassword}
            secureTextEntry={!showNewPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity
            onPress={() => setShowNewPassword(!showNewPassword)}>
            {showNewPassword ? (
              <Ionicons name="eye-off" size={24} color="blue" />
            ) : (
              <Ionicons name="eye" size={24} color="gray" />
            )}
          </TouchableOpacity>
        </View>

        <View className="flex flex-row items-center w-full h-12 px-4 mb-4 bg-gray-100 border-b border-gray-400">
          <TextInput
            className="flex-grow font-bold"
            placeholder="Confirm password"
            value={rePassword}
            secureTextEntry={!showRePassword}
            onChangeText={setRePassword}
          />

          <TouchableOpacity onPress={() => setShowRePassword(!showRePassword)}>
            {showRePassword ? (
              <Ionicons name="eye-off" size={24} color="blue" />
            ) : (
              <Ionicons name="eye" size={24} color="gray" />
            )}
          </TouchableOpacity>
        </View>

        <View className="flex flex-row items-center justify-between my-3">
          <TouchableOpacity
            className="items-center justify-center h-12 px-8 ml-10 bg-blue-700 rounded-2xl"
            onPress={handleChange}>
            <Text className="text-base font-medium text-white ">Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="items-center justify-center h-12 px-6 mr-10 bg-blue-700 rounded-2xl"
            onPress={() => {
              navigation.goBack();
            }}>
            <Text className="text-base font-medium text-white ">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
