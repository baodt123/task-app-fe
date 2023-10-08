import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  addTokenToAxios,
  getAccessToken,
  loginApi,
  setAccessToken,
} from "../../services/auth";
import { Ionicons } from "@expo/vector-icons";
import { setUsername } from "../../services/user";

const LoginScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, "At least 5 characters!")
      .required("Required!"),
    password: Yup.string()
      .min(8, "At least 8 characters!")
      .required("Required!"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const loginResponse = await loginApi(values);
        const { data } = loginResponse;
        console.log(data);
        const result = await setAccessToken(data.accessToken);
        if (result) {
          const username = await setUsername(data.username);
          navigation.navigate("Stack");
        } else {
          alert("error when login");
        }
      } catch (err) {
        const { data } = err.response;
        alert(data.message);
      }
    },
  });

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
        <View className="flex flex-row items-center w-full h-12 px-4 mt-6 mb-4 border-2 border-blue-700 bt-g-gray-100 rounded-xl">
          <TextInput
            className="flex-grow font-bold"
            placeholder="Username"
            value={formik.values.username}
            onChangeText={formik.handleChange("username")}
          />
          {formik.errors.username && (
            <Text className="m-2 text-red-700">{formik.errors.username}</Text>
          )}
        </View>
        <View className="flex flex-row items-center w-full h-12 px-4 mb-4 bg-gray-100 border-2 border-blue-700 rounded-xl">
          <TextInput
            className="flex-grow font-bold"
            placeholder="Password"
            value={formik.values.password}
            secureTextEntry={!showPassword}
            onChangeText={formik.handleChange("password")}
          />
          {formik.errors.password && (
            <Text className="m-2 text-red-700">{formik.errors.password}</Text>
          )}
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Ionicons name="eye-off" size={24} color="blue" />
            ) : (
              <Ionicons name="eye" size={24} color="gray" />
            )}
          </TouchableOpacity>
        </View>
        <View className="flex flex-row items-end justify-end">
          <TouchableOpacity>
            <Text className="mb-4 font-bold text-blue-700">
              Forgot Password
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => formik.handleSubmit()}
          className="flex flex-row items-center justify-center h-12 px-6 bg-blue-700 rounded-xl ">
          <View className="flex items-center flex-1">
            <Text className="text-base font-medium text-white ">Login</Text>
          </View>
        </TouchableOpacity>
        <View className="flex-row justify-center mt-7">
          <Text className="font-semibold text-gray-500 ">
            Don't have an account?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterScreen")}>
            <Text className="font-semibold text-blue-700"> Register Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
