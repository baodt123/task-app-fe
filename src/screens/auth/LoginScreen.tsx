import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  addTokenToAxios,
  getAccessToken,
  loginApi,
  setAccessToken,
} from "../../services/auth";
import { FontAwesome5 } from "@expo/vector-icons";
import { ToastAlert } from "../../components/ToastAlert";
import { setExpoToken, setUsername } from "../../services/user";
import { usePushNoti } from "../../services/notify";

const LoginScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { expoPushToken } = usePushNoti();
  
  const handleLogin = async () => {
    const loginRequest = {
      username: name,
      password,
      expoToken: expoPushToken.data,
    };

    if (name === "") {
      ToastAlert("error", "Error", "Username required!");
      return;
    }
    if (password === "") {
      ToastAlert("error", "Error", "Password required!");
      return;
    }
    try {
      const response = await loginApi(loginRequest);
      const result = await setAccessToken(response.data.accessToken);
      if (result) {
        await setUsername(response.data.username);
        await setExpoToken(expoPushToken.data);
        ToastAlert("success", "Hello", "What are you doing today?");
        navigation.navigate("Stack");
      } else {
        ToastAlert("error", "Error", "Error when login");
      }
    } catch (error) {
      ToastAlert("error", "Error", "Invalid username or password");
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const checkAuthenticated = async () => {
    try {
      const accessToken = await getAccessToken();
      if (accessToken) {
        addTokenToAxios(accessToken);
        navigation.navigate("Stack");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="items-center justify-center flex-1">
      <StatusBar style="auto" />
      <View className="w-full max-w-sm p-10">
        <Text className="mb-2 text-3xl font-bold text-center text-blue-700">
          Login
        </Text>
        <View className="flex flex-row items-center w-full h-12 px-4 mt-6 mb-4 border-2 border-blue-700 rounded-xl">
          <TextInput
            className="flex-grow font-bold"
            placeholder="Username"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View className="flex flex-row items-center w-full h-12 px-4 mb-4 border-2 border-blue-700 rounded-xl">
          <TextInput
            className="flex-grow font-bold"
            placeholder="Password"
            value={password}
            secureTextEntry={!showPassword}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <FontAwesome5 name="eye-slash" size={22} color="blue" />
            ) : (
              <FontAwesome5 name="eye" size={22} color="gray" />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleLogin}
          className="flex flex-row items-center justify-center h-12 px-6 mt-3 bg-blue-700 rounded-xl">
          <View className="flex items-center flex-1">
            <Text className="text-base font-bold text-white ">Login</Text>
          </View>
        </TouchableOpacity>
        <View className="flex-row justify-center mt-5">
          <Text className="font-semibold text-gray-500 ">
            Don't have an account?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterScreen")}>
            <Text className="font-bold text-blue-700"> Register Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
