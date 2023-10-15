import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { getProjectsApi } from "../../services/project";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProjectScreen = ({ navigation }) => {
  const colors = ["blue", "red", "green", "purple", "cyan", "orange"];
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjectsApi()
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    const unsubscribe = navigation.addListener("focus", () => {
      getProjectsApi()
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    });

    return () => unsubscribe();
  }, [navigation]);

  const getColor = (index) => {
    return colors[index % colors.length];
  };

  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <View className="flex flex-row items-center justify-between mx-6 ">
        <Text className="text-2xl font-semibold text-blue-700">Projects</Text>
        <View className="flex flex-row">
          <TouchableOpacity
            onPress={() => navigation.navigate("AddProjectScreen")}
            className="mr-3">
            <Feather name="plus" size={30} color="blue" />
          </TouchableOpacity>
          <Feather name="search" size={30} color="blue" />
        </View>
      </View>
      <View className="h-0.5 my-3 bg-gray-200"></View>
      <View className="mx-6">
        <Text className="mb-6 text-base">All projects</Text>
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              className="flex flex-row items-center mb-4"
              onPress={() =>
                navigation.navigate("ProjectHome", { project: item })
              }>
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

export default ProjectScreen;
