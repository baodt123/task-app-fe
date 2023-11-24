import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { getProjectsApi } from "../../services/project";
import { FontAwesome5 } from "@expo/vector-icons";
import Line from "../../components/Line";
import NothingFlatList from "../../components/NothingFlatList";

const ProjectSeacrh = ({ navigation }) => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
      <View className="p-2 mx-6 my-2 bg-white rounded-xl">
        <TextInput
          className="ml-2 text-base font-medium"
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
          placeholder="Add task to project"
        />
      </View>
      <View className="mx-6 mt-2 bg-gray-200 rounded-xl">
        <NothingFlatList item={projects} />
        <FlatList
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          data={projects.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )}
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
