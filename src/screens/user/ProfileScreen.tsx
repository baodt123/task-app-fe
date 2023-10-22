import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  changePasswordUser,
  getUserInfo,
  updateUserInfo,
} from "../../services/user";
import { FontAwesome5 } from "@expo/vector-icons";
import { ToastAlert } from "../../components/ToastAlert";
import Line from "../../components/Line";

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isChange, setIsChange] = useState(false);
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
      setIsChange(false);
    } catch (error) {
      ToastAlert("error", "Error", "Wrong password!");
    }
  };
  
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
      ToastAlert("success", "Success", "Update info success!");
      setIsEditing(false);
    } catch (error) {
      ToastAlert("error", "Error", "Email already existed!");
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUserInfo()
        .then((response) => {
          setName(response.data.username);
          setEmail(response.data.email);
          setFullName(response.data.fullName);
        })
        .catch((error) => {
          console.log(error)
        });
    });

    return () => unsubscribe();
  }, [navigation]);

  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <View className="flex flex-row items-center justify-between mx-6 ">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex flex-row items-center justify-center">
          <FontAwesome5 name="arrow-left" size={24} color="blue" />
          <Text className="ml-4 text-2xl font-semibold text-blue-700">
            {name}
          </Text>
        </TouchableOpacity>
        <View className="flex flex-row">
          {!isEditing && (
            <TouchableOpacity
              className="mr-3"
              onPress={() => setIsEditing(true)}>
              <FontAwesome5 name="edit" size={24} color="blue" />
            </TouchableOpacity>
          )}
          {!isChange && (
            <TouchableOpacity
              onPress={() => {
                setIsChange(true);
              }}>
              <FontAwesome5 name="user-shield" size={24} color="blue" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Line />
      <View className="items-center justify-center p-2 m-2">
        <FontAwesome5 name="user-astronaut" size={120} color="blue" />
      </View>
      <View className="">
        {!isChange && (
          <View className="justify-center p-4 mx-6 mb-6 bg-gray-200 rounded-xl">
            <View className="flex flex-row items-center justify-center m-3">
              <Text className="w-24 ml-3 text-lg font-medium">Name</Text>
              {!isEditing && (
                <Text className="px-2 text-lg font-medium w-60">
                  {fullName}
                </Text>
              )}
              {isEditing && (
                <View className="flex flex-row items-center px-2 mr-2 border-b border-gray-400 w-60 bt-g-gray-100">
                  <TextInput
                    className="flex-grow text-lg font-medium"
                    value={fullName}
                    onChangeText={setFullName}
                  />
                </View>
              )}
            </View>
            <View className="flex flex-row items-center justify-center my-3 ">
              <Text className="w-24 ml-3 text-lg font-medium">Email</Text>
              {!isEditing && (
                <Text className="px-2 text-lg font-medium w-60">{email}</Text>
              )}
              {isEditing && (
                <View className="flex flex-row items-center px-2 mr-2 border-b border-gray-400 w-60 bt-g-gray-100">
                  <TextInput
                    className="flex-grow text-lg font-medium"
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
                    className="items-center justify-center h-12 px-8 ml-10 bg-blue-700 rounded-3xl"
                    onPress={handleUpdate}>
                    <Text className="text-base font-medium text-white ">
                      Save
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="items-center justify-center h-12 px-6 mr-10 bg-white rounded-3xl"
                    onPress={() => {
                      setIsEditing(false);
                    }}>
                    <Text className="text-base font-medium text-blue-700 ">
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        )}
      </View>
      {!isChange && <View></View>}
      {isChange && (
        <View className="justify-center p-4 mx-6 bg-gray-200 rounded-xl">
          <View className="mb-4 ">
            <Text className="text-xl font-semibold">Change password</Text>
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
                <FontAwesome5 name="eye-slash" size={22} color="blue" />
              ) : (
                <FontAwesome5 name="eye" size={22} color="gray" />
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
                <FontAwesome5 name="eye-slash" size={22} color="blue" />
              ) : (
                <FontAwesome5 name="eye" size={22} color="gray" />
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

            <TouchableOpacity
              onPress={() => setShowRePassword(!showRePassword)}>
              {showRePassword ? (
                <FontAwesome5 name="eye-slash" size={22} color="blue" />
              ) : (
                <FontAwesome5 name="eye" size={22} color="gray" />
              )}
            </TouchableOpacity>
          </View>

          <View className="flex flex-row items-center justify-between my-3">
            <TouchableOpacity
              className="items-center justify-center h-12 px-8 ml-10 bg-blue-700 rounded-3xl"
              onPress={handleChange}>
              <Text className="text-base font-medium text-white ">Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="items-center justify-center h-12 px-6 mr-10 bg-white rounded-3xl"
              onPress={() => {
                setIsChange(false);
              }}>
              <Text className="text-base font-medium text-blue-700 ">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;
