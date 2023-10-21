import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { getProjectById } from "../../services/project";
import { ToastAlert } from "../../components/ToastAlert";

const ProjectHome = ({ route, navigation }) => {
  const { project } = route.params;
  const [name, setName] = useState("");
  useEffect(() => {
    getProjectById(project.id)
      .then((response) => {
        setName(response.data.name);
      })
      .catch((error) => {
        ToastAlert("error", "Error", error);
      });

    const unsubscribe = navigation.addListener("focus", () => {
      getProjectById(project.id)
        .then((response) => {
          setName(response.data.name);
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
      </View>
      <View className="h-0.5 mt-3 bg-gray-200"></View>

      <View className="mx-6">
        <TouchableOpacity
          className="border-b border-b-gray-300"
          onPress={() => navigation.navigate("BroadScreen", { project })}>
          <Text className="py-4 text-xl">Board</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="border-b border-b-gray-300"
          onPress={() => navigation.navigate("MemberScreen", { project })}>
          <Text className="py-4 text-xl">Member</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="border-b border-b-gray-300"
          onPress={() => navigation.navigate("DetailScreen", { project })}>
          <Text className="py-4 text-xl">Detail</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProjectHome;
