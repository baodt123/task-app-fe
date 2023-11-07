import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { createProjectApi } from "../../services/project";
import { ToastAlert } from "../../components/ToastAlert";
import { FontAwesome5 } from "@expo/vector-icons";
import Line from "../../components/Line";

const AddProjectScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const hanldeCreate = async () => {
    const ProjectData = {
      name,
      description,
    };

    if (!ProjectData.name) {
      ToastAlert("error", "Error", "Name is required!");
      return;
    }

    if (ProjectData.name.length < 3) {
      ToastAlert("error", "Error", "Name must be at least 3 characters long!");
      return;
    }
    try {
      await createProjectApi(ProjectData);
      ToastAlert("success", "Success", "Create project success!");
      navigation.goBack();
    } catch (error) {
      ToastAlert("error", "Error", "Project name already used!");
    }
  };

  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <View className="mx-6">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex flex-row items-center">
          <FontAwesome5 name="arrow-left" size={20} color="blue" />
          <Text className="ml-3 text-xl font-semibold text-blue-700">
            Add new project
          </Text>
        </TouchableOpacity>
      </View>
      <Line />
      <View className="justify-center px-3 py-2 mx-6 rounded-xl">
        <Text className="text-lg font-semibold ">Name</Text>
        <View className="flex flex-row py-1 mb-2 text-lg border-b border-gray-400">
          <TextInput
            className="flex-grow text-lg"
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <Text className="text-lg font-semibold ">Description</Text>
        <TextInput
          className="py-1 mb-2 text-lg border-b border-gray-400"
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
        />
        <TouchableOpacity
          className="items-center justify-center p-2.5 my-2 bg-blue-700 rounded-lg"
          onPress={hanldeCreate}>
          <Text className="text-lg font-semibold text-white">
            Create Project
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddProjectScreen;
