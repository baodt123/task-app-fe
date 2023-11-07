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

  const colors = ["blue", "red", "green", "orange"];
  const getColor = (index) => {
    return colors[index % colors.length];
  };

  const handleEnroll = async () => {
    const username = await getUsername();
    try {
      await addMemberToProject(projectId, username);
      ToastAlert("success", "Success", "New project was added to workspace!");
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
        <FontAwesome5 name="arrow-left" size={20} color="blue" />
        <Text className="ml-3 text-xl font-semibold text-blue-700">
          Join in new project
        </Text>
      </TouchableOpacity>
      <Line />
      <View className="mx-3 mt-2">
        <FlatList
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={{ paddingBottom: 150 }}
          data={projects}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              className="flex flex-row py-1.5 mx-3 my-1 bg-white rounded-lg"
              onPress={() => setProjectId(item.id)}>
              <View className="items-center justify-center p-3 bg-white rounded-full">
                <FontAwesome5
                  name="folder-plus"
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

export default EnrollUser;
