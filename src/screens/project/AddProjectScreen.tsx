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
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="flex flex-row items-center ml-6">
        <FontAwesome5 name="arrow-left" size={24} color="blue" />
        <Text className="ml-4 text-2xl font-semibold text-blue-700">
          Add new project
        </Text>
      </TouchableOpacity>
      <Line/>
      <View className="justify-center p-4 m-6 bg-gray-200 rounded-xl">
        <Text className="text-xl font-medium ">Name</Text>
        <View className="flex flex-row py-2 mb-2 text-lg border-b border-gray-400">
          <TextInput
            className="flex-grow text-lg"
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <Text className="text-xl font-medium ">Description</Text>
        <TextInput
          className="py-2 mb-2 text-lg border-b border-gray-400"
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
        />
        <TouchableOpacity
          className="items-center justify-center p-2.5 my-2 bg-blue-700 rounded-xl"
          onPress={hanldeCreate}>
          <Text className="text-xl font-medium text-white">Create Project</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddProjectScreen;
