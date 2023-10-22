import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getTaskByAssigneeUser } from "../../services/task";
import { FontAwesome5 } from "@expo/vector-icons";
import Line from "../../components/Line";
import NothingFlatList from "../../components/NothingFlatList";
import { DrawerActions } from "@react-navigation/native";


const IssuesScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    getTaskByAssigneeUser()
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

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
            Task
          </Text>
        </View>
        <View className="flex flex-row">
          <TouchableOpacity
            onPress={() => navigation.navigate("AddTaskOutside", { tasks })}
            className="mr-3">
            <FontAwesome5 name="plus" size={24} color="blue" />
          </TouchableOpacity>
        </View>
      </View>
      <Line />
      <View className="mx-4 mt-2 bg-gray-200 rounded-xl">
        <View className="items-start justify-center">
          <Text className="m-4 text-lg font-bold">Tasks - {tasks.length}</Text>
        </View>
        <NothingFlatList item={tasks} />
        <FlatList
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={{ paddingBottom: 10 }}
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => {
            let color;
            switch (item.priority) {
              case "LOW":
                color = "green";
                break;
              case "MEDIUM":
                color = "blue";
                break;
              case "HIGH":
                color = "purple";
                break;
              default:
                color = "black";
            }
            return (
              <TouchableOpacity
                className="flex flex-row items-center p-3 mx-3 my-1.5 bg-white rounded-lg"
                onPress={() => navigation.navigate("DetailTask", { item })}>
                <FontAwesome5 name="bookmark" size={24} color={color} />
                <Text className="ml-3 text-lg font-medium">{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default IssuesScreen;
