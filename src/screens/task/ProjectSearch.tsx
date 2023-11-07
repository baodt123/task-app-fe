import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { getProjectsApi } from "../../services/project";
import { FontAwesome5 } from "@expo/vector-icons";
import Line from "../../components/Line";
import NothingFlatList from "../../components/NothingFlatList";

const ProjectSeacrh = ({ navigation }) => {
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

  const colors = ["blue", "red", "green", "purple", "cyan", "orange"];
  const getColor = (index) => {
    return colors[index % colors.length];
  };

  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="flex flex-row items-center ml-6">
        <FontAwesome5 name="arrow-left" size={20} color="blue" />
        <Text className="ml-3 text-xl font-semibold text-blue-700">
          Add task to project
        </Text>
      </TouchableOpacity>
      <Line />
      <View className="mx-4 mt-2 bg-gray-200 rounded-xl">
        <View className="items-start justify-center">
          <Text className="m-4 text-lg font-bold">
            Your projects - {projects.length}
          </Text>
        </View>
        <NothingFlatList item={projects} />
        <FlatList
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          data={projects}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              className="flex flex-row items-center p-3 m-1.5 bg-white rounded-lg"
              onPress={() =>
                navigation.navigate("AddTaskOutside", { project: item })
              }>
              <FontAwesome5 name="folder" size={20} color={getColor(index)} />
              <Text className="ml-3 text-lg font-medium ">{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProjectSeacrh;
