import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { getProjectsApi } from "../services/project";
import { getTaskByAssigneeUser } from "../services/task";
import Line from "../components/Line";
import { DrawerActions } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [something, setSomething] = useState([]);
  const colors = ["blue", "red", "green", "purple", "cyan", "orange"];
  const getColor = (index) => {
    return colors[index % colors.length];
  };
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

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getTaskByAssigneeUser()
        .then((response) => {
          setTasks(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    });

    return () => unsubscribe();
  }, [navigation]);

  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <View className="flex flex-row items-center justify-between mx-6 ">
        <View className="flex flex-row items-center justify-center">
          <TouchableOpacity
            className="mr-3"
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <FontAwesome5 name="bars" size={24} color="blue" />
          </TouchableOpacity>
          <Text className="text-2xl font-semibold text-blue-700">
            Quick Access
          </Text>
        </View>
      </View>
      <Line />
      <View>
        <FlatList
          data={something}
          renderItem={({ item, index }) => <View></View>}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={{ paddingBottom: 80 }}
          ListHeaderComponent={
            <View className="mx-4 mt-2 bg-gray-200 rounded-xl">
              <View className="items-start justify-center">
                <Text className="m-4 text-lg font-bold">
                  Projects - {projects.length}
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
                    onPress={() =>
                      navigation.navigate("BroadScreen", { project: item })
                    }>
                    <FontAwesome5
                      name="folder-open"
                      size={24}
                      color={getColor(index)}
                    />
                    <Text className="ml-3 text-lg font-medium ">
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          }
          ListFooterComponent={
            <View className="mx-4 mt-2 bg-gray-200 rounded-xl">
              <View className="items-start justify-center">
                <Text className="m-4 text-lg font-bold">
                  Tasks - {tasks.length}
                </Text>
              </View>
              <FlatList
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    className="flex flex-row items-center p-3 m-1.5 bg-white rounded-lg"
                    onPress={() => navigation.navigate("DetailTask", { item })}>
                    <FontAwesome5
                      name="bookmark"
                      size={24}
                      color={getColor(index)}
                    />
                    <Text className="ml-3 text-lg font-medium ">
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
