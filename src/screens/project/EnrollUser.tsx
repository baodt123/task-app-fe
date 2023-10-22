import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  addMemberToProject,
  findProjectUserNotIn,
} from "../../services/project";
import { FontAwesome5 } from "@expo/vector-icons";
import { getUsername } from "../../services/user";
import Line from "../../components/Line";
import { ToastAlert } from "../../components/ToastAlert";

const EnrollUser = ({ navigation }) => {
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      findProjectUserNotIn()
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    });

    return () => unsubscribe();
  }, [navigation]);

  const colors = ["blue", "red", "green", "purple", "cyan", "orange"];
  const getColor = (index) => {
    return colors[index % colors.length];
  };

  const handleEnroll = async () => {
    const username = await getUsername();
    try {
      await addMemberToProject(projectId, username);
      ToastAlert("success", "Success", "New project was added to workspace!")
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (projectId !== "") {
      handleEnroll();
    }
  }, [projectId]);

  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="flex flex-row items-center ml-6">
        <FontAwesome5 name="arrow-left" size={24} color="blue" />
        <Text className="ml-4 text-2xl font-semibold text-blue-700">
          Join in new project
        </Text>
      </TouchableOpacity>
      <Line />
      <View className="mx-4 mt-2 bg-gray-200 rounded-xl">
        <View className="items-start justify-center ">
          <Text className="m-4 text-lg font-bold">
            Other projects - {projects.length}
          </Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          data={projects}
          contentContainerStyle={{ paddingBottom: 30 }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              className="flex flex-row items-center p-3 m-1.5 bg-white rounded-lg"
              onPress={() => setProjectId(item.id)}>
              <FontAwesome5
                name="folder-plus"
                size={24}
                color={getColor(index)}
              />
              <Text className="ml-3 text-lg font-medium ">{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default EnrollUser;
