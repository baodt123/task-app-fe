import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import {
    deleteProjectApi,
    getProjectById,
    updateProjectApi,
} from "../../services/project";
import {ToastAlert} from "../../components/ToastAlert";
import Line from "../../components/Line";

const ProjectDetailScreen = ({route, navigation}) => {
    const {project} = route.params;
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
            ToastAlert("success", "Success", "Update project's detail success!");
            setIsEditing(false);
        } catch (error) {
            ToastAlert("error", "Error", "Something went wrong!");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteProjectApi(project.id);
            ToastAlert("success", "Success", "Delete success!");
            navigation.navigate("Project");
        } catch (error) {
            ToastAlert("error", "Error", "Only managers can delete project!");
        }
    };

    useEffect(() => {
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
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="flex flex-row items-center justify-center">
            <FontAwesome5 name="arrow-left" size={24} color="blue" />
            <Text className="ml-4 text-2xl font-semibold text-blue-700">
              {project.name}
            </Text>
          </TouchableOpacity>
          <View className="flex flex-row">
            {!isEditing && (
              <View className="flex flex-row">
                <TouchableOpacity
                  className="mr-3"
                  onPress={() => setIsEditing(true)}>
                  <FontAwesome5 name="edit" size={24} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete}>
                  <FontAwesome5 name="trash" size={24} color="blue" />
                </TouchableOpacity>
              </View>
            )}
            {isEditing && (
              <View className="flex flex-row">
                <TouchableOpacity className="mr-3" onPress={hanldeUpdate}>
                  <FontAwesome5 name="check" size={24} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsEditing(false)}>
                  <FontAwesome5 name="window-close" size={24} color="blue" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <Line />

        <View className="justify-center p-4 m-6 bg-gray-200 rounded-xl">
          <Text className="mt-3 text-xl font-medium">Project name</Text>
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
          {!isEditing && (
            <Text className="py-2 mb-2 text-lg">{description}</Text>
          )}
          {isEditing && (
            <View className="flex flex-row py-2 mb-2 text-lg border-b border-gray-400">
              <TextInput
                className="flex-grow text-lg"
                value={description}
                onChangeText={setDescription}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    );
};

export default ProjectDetailScreen;
