import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  deleteProjectApi,
  getProjectById,
  updateProjectApi,
} from "../../services/project";
import { ToastAlert } from "../../components/ToastAlert";

const ProjectDetailScreen = ({ route, navigation }) => {
  const { project } = route.params;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const hanldeUpdate = async () => {
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
      await updateProjectApi(project.id, ProjectData);
      ToastAlert("success", "Success", "Update success!");
      setIsEditing(false);
    } catch (error) {
      ToastAlert("error", "Error", "Error when update!");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProjectApi(project.id);
      ToastAlert("success", "Success", "Delete success!");
      navigation.navigate("Project");
    } catch (error) {
      ToastAlert("error", "Error", "Error when delete!");
    }
  };

  useEffect(() => {
    getProjectById(project.id)
      .then((response) => {
        setName(response.data.name);
        setDescription(response.data.description);
      })
      .catch((error) => {
        ToastAlert("error", "Error", error);
      });

    const unsubscribe = navigation.addListener("focus", () => {
      getProjectById(project.id)
        .then((response) => {
          setName(response.data.name);
          setDescription(response.data.description);
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
        <Text className="text-2xl font-semibold text-blue-700">
          {name}
        </Text>
        <View className="flex flex-row">
          {!isEditing && (
            <TouchableOpacity
              className="mr-3"
              onPress={() => setIsEditing(true)}>
              <AntDesign name="edit" size={24} color="blue" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleDelete}>
            <AntDesign name="delete" size={24} color="blue" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="h-0.5 my-3 bg-gray-200"></View>

      <View className="mx-6">
        <Text className="text-xl font-medium ">Project name</Text>
        {!isEditing && <Text className="py-2 mb-2 text-lg ">{name}</Text>}
        {isEditing && (
          <View className="flex flex-row py-2 mb-2 text-lg border-b border-gray-400">
            <TextInput
              className="flex-grow text-lg"
              value={name}
              onChangeText={setName}
            />
          </View>
        )}
        <Text className="text-xl font-medium ">Description</Text>
        {!isEditing && <Text className="py-2 mb-2 text-lg">{description}</Text>}
        {isEditing && (
          <View className="flex flex-row py-2 mb-2 text-lg border-b border-gray-400">
            <TextInput
              className="flex-grow text-lg"
              value={description}
              onChangeText={setDescription}
            />
          </View>
        )}

        <View className="flex flex-row items-center justify-between my-3">
          {isEditing && (
            <>
              <TouchableOpacity
                className="items-center justify-center h-12 px-8 bg-blue-700 ml-14 rounded-2xl"
                onPress={hanldeUpdate}>
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

export default ProjectDetailScreen;
