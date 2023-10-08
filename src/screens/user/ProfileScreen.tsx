import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getUserInfo, updateUserInfo } from "../../services/user";
import { FontAwesome5 } from "@expo/vector-icons";


const ProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [originalFullName, setOriginalFullName] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(5, "At least 5 characters!")
      .required("Required!"),
    email: Yup.string().email("Invalid!").required("Required!"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await updateUserInfo(values);
        Alert.alert("Message", "Update data success!");
        setOriginalFullName(values.fullName);
        setOriginalEmail(values.email);
        setIsEditing(false);
      } catch (error) {
        console.log("Error updating user info", error);
      }
    },
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        setUsername(response.data.username);
        formik.setFieldValue("fullName", response.data.fullName);
        formik.setFieldValue("email", response.data.email);
        setOriginalFullName(response.data.fullName);
        setOriginalEmail(response.data.email);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <View className="flex flex-row items-center justify-between mx-6 ">
        <Text className="text-2xl font-semibold text-blue-700">Profile</Text>
        <View className="flex flex-row">
          {!isEditing && (
            <TouchableOpacity
              className="mr-3"
              onPress={() => setIsEditing(true)}>
              <FontAwesome5 name="edit" size={24} color="blue" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate("ChangePasswordScreen")}>
            <FontAwesome5 name="user-shield" size={24} color="blue" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="h-0.5 my-3 bg-gray-200"></View>
      <View className="items-center justify-center p-2 m-2">
        <MaterialCommunityIcons name="penguin" size={120} color="blue" />
      </View>
      <View className="mx-6">
        <View className="mb-6">
          <Text className="text-2xl font-semibold text-center">
            Hello, {username}
          </Text>
        </View>
        <View className="flex flex-row items-center justify-center my-3">
          <Text className="w-24 text-lg font-medium">Name</Text>
          {!isEditing && (
            <Text className="px-2 font-medium w-60">
              {formik.values.fullName}
            </Text>
          )}
          {isEditing && (
            <View className="flex flex-row items-center px-2 border-b border-gray-400 w-60 bt-g-gray-100">
              <TextInput
                className="flex-grow font-medium"
                value={formik.values.fullName}
                onChangeText={formik.handleChange("fullName")}
              />
              {formik.errors.fullName && (
                <Text className="mx-2 text-red-700">
                  {formik.errors.fullName}
                </Text>
              )}
            </View>
          )}
        </View>
        <View className="flex flex-row items-center justify-center my-3">
          <Text className="w-24 text-lg font-medium">Email</Text>
          {!isEditing && (
            <Text className="px-2 font-medium w-60 ">
              {formik.values.email}
            </Text>
          )}
          {isEditing && (
            <View className="flex flex-row items-center px-2 border-b border-gray-400 w-60 bt-g-gray-100">
              <TextInput
                className="flex-grow font-medium "
                value={formik.values.email}
                onChangeText={formik.handleChange("email")}
              />
              {formik.errors.email && (
                <Text className="mx-2 text-red-700">{formik.errors.email}</Text>
              )}
            </View>
          )}
        </View>
        <View className="flex flex-row items-center justify-between my-3">
          {isEditing && (
            <>
              <TouchableOpacity
                className="items-center justify-center h-12 px-8 bg-blue-700 ml-14 rounded-2xl"
                onPress={() => formik.handleSubmit()}>
                <Text className="text-base font-medium text-white ">Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="items-center justify-center h-12 px-6 bg-blue-700 mr-14 rounded-2xl"
                onPress={() => {
                  setIsEditing(false);
                  formik.setFieldValue("fullName", originalFullName);
                  formik.setFieldValue("email", originalEmail);
                }}>
                <Text className="text-base font-medium text-white ">
                  Cancel
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
