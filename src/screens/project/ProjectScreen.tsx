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
import { DrawerActions } from "@react-navigation/native";

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

  const colors = ["blue", "red", "green", "orange"];
  const getColor = (index) => {
    return colors[index % colors.length];
  };

  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <View className="flex flex-row items-center justify-between mx-6 ">
        <View className="flex flex-row items-center justify-center">
          <TouchableOpacity
            className="mr-3"
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <FontAwesome5 name="bars" size={20} color="blue" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-blue-700">Project</Text>
        </View>
        <View className="flex flex-row">
          <TouchableOpacity
            onPress={() => navigation.navigate("AddProjectScreen")}
            className="mr-4">
            <FontAwesome5 name="plus" size={20} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("EnrollUser")}>
            <FontAwesome5 name="search" size={20} color="blue" />
          </TouchableOpacity>
        </View>
      </View>
      <Line />
      <View className="mx-4">
        <View className="items-start justify-center">
          <Text className="mx-3 my-2 text-lg font-semibold">
            My projects - {projects.length}
          </Text>
        </View>
        <NothingFlatList item={projects} />
        <FlatList
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={{ paddingBottom: 150 }}
          data={projects}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              className="flex flex-row py-1.5 mx-3 my-1 bg-white rounded-lg"
              onPress={() =>
                navigation.navigate("BroadScreen", { project: item })
              }>
              <View className="items-center justify-center p-3 bg-white rounded-full">
                <FontAwesome5
                  name="folder-minus"
                  size={20}
                  color={getColor(index)}
                />
              </View>
              <View className="flex flex-col">
                <Text className="ml-2 text-base font-medium">{item.name}</Text>
                <Text className="mb-1 ml-2 text-sm text-gray-400">
                  {item.description != "" ? item.description : "No description"}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProjectScreen;
