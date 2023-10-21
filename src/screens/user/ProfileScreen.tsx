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
import { getUserInfo, updateUserInfo } from "../../services/user";
import { FontAwesome5 } from "@expo/vector-icons";
import { ToastAlert } from "../../components/ToastAlert";

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async () => {
    const updateRequest = {
      email,
      fullName,
    };

    if (!updateRequest.email) {
      ToastAlert("error", "Error", "Email is required!");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(updateRequest.email)) {
      ToastAlert("error", "Error", "Invalid email format");
      return;
    }

    if (!updateRequest.fullName) {
      ToastAlert("error", "Error", "Name is required!");
      return;
    }

    try {
      await updateUserInfo(updateRequest);
      ToastAlert("success", "Success", "Update success!");
      setIsEditing(false);
    } catch (error) {
      ToastAlert("error", "Error", "Email already existed!");
    }
  };

  useEffect(() => {
    getUserInfo()
      .then((response) => {
        setName(response.data.username);
        setEmail(response.data.email);
        setFullName(response.data.fullName);
      })
      .catch((error) => {
        ToastAlert("error", "Error", error);
      });

    const unsubscribe = navigation.addListener("focus", () => {
      getUserInfo()
        .then((response) => {
          setName(response.data.username);
          setEmail(response.data.email);
          setFullName(response.data.fullName);
        })
        .catch((error) => {
          ToastAlert("error", "Error", error);
        });
    });

    return () => unsubscribe();
  }, [navigation]);

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
            Hello, {name}
          </Text>
        </View>
        <View className="flex flex-row items-center justify-center my-3">
          <Text className="w-24 text-lg font-medium">Name</Text>
          {!isEditing && (
            <Text className="px-2 font-medium w-60">{fullName}</Text>
          )}
          {isEditing && (
            <View className="flex flex-row items-center px-2 border-b border-gray-400 w-60 bt-g-gray-100">
              <TextInput
                className="flex-grow font-medium"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
          )}
        </View>
        <View className="flex flex-row items-center justify-center my-3">
          <Text className="w-24 text-lg font-medium">Email</Text>
          {!isEditing && (
            <Text className="px-2 font-medium w-60 ">{email}</Text>
          )}
          {isEditing && (
            <View className="flex flex-row items-center px-2 border-b border-gray-400 w-60 bt-g-gray-100">
              <TextInput
                className="flex-grow font-medium "
                value={email}
                onChangeText={setEmail}
              />
            </View>
          )}
        </View>
        <View className="flex flex-row items-center justify-between my-3">
          {isEditing && (
            <>
              <TouchableOpacity
                className="items-center justify-center h-12 px-8 bg-blue-700 ml-14 rounded-2xl"
                onPress={handleUpdate}>
                <Text className="text-base font-medium text-white ">Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="items-center justify-center h-12 px-6 bg-blue-700 mr-14 rounded-2xl"
                onPress={() => {
                  setIsEditing(false);
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
