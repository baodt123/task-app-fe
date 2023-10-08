import { useFormik } from "formik";
import * as Yup from "yup";
import { StatusBar } from "expo-status-bar";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { registerApi } from "../../services/auth";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-navigation";

const RegisterScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, "At least 5 characters!")
      .required("Required!"),
    email: Yup.string().email("Invalid!").required("Required!"),
    password: Yup.string()
      .min(8, "At least 8 characters!")
      .required("Required!"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Not match!")
      .required("Required!"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const registerResponse = await registerApi(values);
        console.log("Result", registerResponse.data);
        navigation.navigate("LoginScreen");
      } catch (err) {
        if (
          err.response &&
          err.response.data.message === "Username or email already used"
        ) {
          alert(err.response.data.message);
        } else {
          alert(err);
        }
      }
    },
  });

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
        <View className="flex flex-row items-center w-full h-12 px-4 mt-6 mb-4 bg-gray-100 border-2 border-blue-700 rounded-xl">
          <TextInput
            className="flex-grow font-bold"
            placeholder="Email"
            value={formik.values.email}
            onChangeText={formik.handleChange("email")}
          />
          {formik.errors.email && (
            <Text className="m-2 text-red-700">{formik.errors.email}</Text>
          )}
        </View>
        <View className="flex flex-row items-center w-full h-12 px-4 mb-4 bg-gray-100 border-2 border-blue-700 rounded-xl">
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
        <View className="flex flex-row items-center w-full h-12 px-4 mb-4 bg-gray-100 border-2 border-blue-700 rounded-xl">
          <TextInput
            className="flex-grow font-bold"
            placeholder="Confirm Password"
            value={formik.values.rePassword}
            secureTextEntry={!showRePassword}
            onChangeText={formik.handleChange("rePassword")}
          />
          {formik.errors.rePassword && (
            <Text className="m-2 text-red-700">{formik.errors.rePassword}</Text>
          )}
          <TouchableOpacity onPress={() => setShowRePassword(!showRePassword)}>
            {showRePassword ? (
              <Ionicons name="eye-off" size={24} color="blue" />
            ) : (
              <Ionicons name="eye" size={24} color="gray" />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="flex flex-row items-center justify-center h-12 px-6 mt-6 bg-blue-700 rounded-2xl">
          <View className="flex items-center flex-1">
            <Text
              className="text-base font-bold text-white"
              onPress={() => formik.handleSubmit()}>
              Sign Up
            </Text>
          </View>
        </TouchableOpacity>
        <View className="flex-row justify-center mt-7">
          <Text className="font-semibold text-gray-500">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text className="font-semibold text-blue-700"> Login Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
