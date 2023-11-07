import { StatusBar } from "expo-status-bar";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { registerApi } from "../../services/auth";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-navigation";
import { ToastAlert } from "../../components/ToastAlert";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const handleRegister = async () => {
    const registerRequest = {
      email,
      username,
      password,
      rePassword,
    };

    if (!registerRequest.email) {
      ToastAlert("error", "Error", "Email is required!");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(registerRequest.email)) {
      ToastAlert("error", "Error", "Invalid email format");
      return;
    }

    if (!registerRequest.username) {
      ToastAlert("error", "Error", "Username is required!");
      return;
    }

    if (registerRequest.username.length < 5) {
      ToastAlert(
        "error",
        "Error",
        "Username must be at least 5 characters long"
      );
      return;
    }

    if (!registerRequest.password) {
      ToastAlert("error", "Error", "Password is required!");
      return;
    }

    if (registerRequest.password.length < 8) {
      ToastAlert(
        "error",
        "Error",
        "Password must be at least 8 characters long"
      );
      return;
    }

    if (!registerRequest.rePassword) {
      ToastAlert("error", "Error", "Confirm password is required!");
      return;
    }

    if (registerRequest.rePassword !== registerRequest.password) {
      ToastAlert("error", "Error", "Confirm password do not match!");
      return;
    }

    try {
      await registerApi(registerRequest);
      ToastAlert("success", "Success", "Sign up success!");
      navigation.navigate("LoginScreen");
    } catch (error) {
      ToastAlert("error", "Error", "Username or email already existed!");
    }
  };

  return (
    <SafeAreaView className="items-center justify-center flex-1">
      <StatusBar style="auto" />
      <View className="w-full max-w-sm p-10">
        <Text className="mb-2 text-3xl font-bold text-center text-blue-700">
          Create Account
        </Text>
        <Text className="font-semibold text-center text-gray-500 font-base">
          Create an account so you can explore all projects
        </Text>
        <View className="flex flex-row items-center w-full h-12 px-4 mt-6 mb-4 bg-gray-200 border-2 border-blue-700 rounded-xl">
          <TextInput
            className="flex-grow font-bold"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View className="flex flex-row items-center w-full h-12 px-4 mb-4 bg-gray-200 border-2 border-blue-700 rounded-xl">
          <TextInput
            className="flex-grow font-bold"
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View className="flex flex-row items-center w-full h-12 px-4 mb-4 bg-gray-200 border-2 border-blue-700 rounded-xl">
          <TextInput
            className="flex-grow font-bold"
            placeholder="Password"
            value={password}
            secureTextEntry={!showPassword}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <FontAwesome5 name="eye-slash" size={20} color="blue" />
            ) : (
              <FontAwesome5 name="eye" size={20} color="gray" />
            )}
          </TouchableOpacity>
        </View>
        <View className="flex flex-row items-center w-full h-12 px-4 mb-4 bg-gray-200 border-2 border-blue-700 rounded-xl">
          <TextInput
            className="flex-grow font-bold"
            placeholder="Confirm Password"
            value={rePassword}
            secureTextEntry={!showRePassword}
            onChangeText={setRePassword}
          />
          <TouchableOpacity onPress={() => setShowRePassword(!showRePassword)}>
            {showRePassword ? (
              <FontAwesome5 name="eye-slash" size={22} color="blue" />
            ) : (
              <FontAwesome5 name="eye" size={22} color="gray" />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="flex flex-row items-center justify-center h-12 px-6 mt-6 bg-blue-700 rounded-2xl">
          <View className="flex items-center flex-1">
            <Text
              className="text-base font-bold text-white"
              onPress={handleRegister}>
              Sign Up
            </Text>
          </View>
        </TouchableOpacity>
        <View className="flex-row justify-center mt-7">
          <Text className="font-semibold text-gray-500">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text className="font-bold text-blue-700"> Login Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
