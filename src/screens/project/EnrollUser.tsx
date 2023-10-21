import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  addMemberToProject,
  findAll,
  findProjectUserNotIn,
  getProjectsApi,
} from "../../services/project";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getUsername } from "../../services/user";

const EnrollUser = ({ navigation }) => {
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");

  useEffect(() => {
    findProjectUserNotIn()
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

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
      <View className="flex flex-row items-center justify-between mx-6 ">
        <Text className="text-2xl font-semibold text-blue-700">Projects</Text>
      </View>
      <View className="h-0.5 my-3 bg-gray-200"></View>
      <View className="mx-4 mt-2 bg-gray-200 rounded-xl">
        <View className="items-start justify-center">
          <Text className="m-4 text-base font-bold">
            PROJECTS - {projects.length}
          </Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          data={projects}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              className="flex flex-row items-center p-3 m-1.5 bg-white rounded-lg"
              onPress={() => setProjectId(item.id)}>
              <MaterialCommunityIcons
                name="penguin"
                size={30}
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
