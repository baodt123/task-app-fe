import { useFormik } from "formik";
import * as Yup from "yup";
import { StatusBar } from "expo-status-bar";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { changePasswordUser } from "../../services/user";
import { SafeAreaView } from "react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";

const ChangePasswordScreen = ({ navigation }) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(8, "At least 8 characters!")
      .required("Required!"),
    newPassword: Yup.string()
      .min(8, "At least 8 characters!")
      .required("Required!"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Not match!")
      .required("Required!"),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await changePasswordUser(values);
        console.log(response);
        navigation.navigate("Profile");
      } catch (error) {
        console.log("Error updating user info", error);
      }
    },
  });

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
            value={formik.values.oldPassword}
            secureTextEntry={!showOldPassword}
            onChangeText={formik.handleChange("oldPassword")}
          />
          {formik.errors.oldPassword && (
            <Text className="m-2 text-red-700">
              {formik.errors.oldPassword}
            </Text>
          )}
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
            value={formik.values.newPassword}
            secureTextEntry={!showNewPassword}
            onChangeText={formik.handleChange("newPassword")}
          />
          {formik.errors.newPassword && (
            <Text className="m-2 text-red-700">
              {formik.errors.newPassword}
            </Text>
          )}
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

        <View className="flex flex-row items-center justify-between my-3">
          <TouchableOpacity
            className="items-center justify-center h-12 px-8 ml-10 bg-blue-700 rounded-2xl"
            onPress={() => formik.handleSubmit()}>
            <Text className="text-base font-medium text-white ">Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="items-center justify-center h-12 px-6 mr-10 bg-blue-700 rounded-2xl"
            onPress={() => {
              formik.resetForm();
              navigation.navigate("Profile");
            }}>
            <Text className="text-base font-medium text-white ">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
