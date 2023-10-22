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
import { FontAwesome5 } from "@expo/vector-icons";
import Line from "../../components/Line";
import NothingFlatList from "../../components/NothingFlatList";

const ProjectScreen = ({ navigation }) => {
  
  const [projects, setProjects] = useState([]);

  useEffect(() => {
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


  const colors = ["blue", "red", "green", "purple", "orange"];
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
            className="mr-4">
            <FontAwesome5 name="plus" size={24} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("EnrollUser")}>
            <FontAwesome5 name="search" size={24} color="blue" />
          </TouchableOpacity>
        </View>
      </View>
      <Line />
      <View className="mx-4 mt-2 bg-gray-200 rounded-xl">
        <View className="items-start justify-center">
          <Text className="m-4 text-lg font-bold">
            Projects - {projects.length}
          </Text>
        </View>
        <NothingFlatList item={projects} />
        <FlatList
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={{ paddingBottom: 10 }}
          data={projects}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              className="flex flex-row items-center p-3 mx-3 my-1.5 bg-white rounded-lg"
              onPress={() =>
                navigation.navigate("BroadScreen", { project: item })
              }>
              <FontAwesome5
                name="folder-open"
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

export default ProjectScreen;
