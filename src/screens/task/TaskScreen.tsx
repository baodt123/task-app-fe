import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather } from "@expo/vector-icons";
import { getTaskByAssigneeUser } from '../../services/task';
import { MaterialCommunityIcons } from "@expo/vector-icons";
const IssuesScreen = ({navigation}) => {
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

  const colors = ["blue", "red", "green", "purple", "cyan", "orange"];
  const getColor = (index) => {
    return colors[index % colors.length];
  };
  
  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <View className="flex flex-row items-center justify-between mx-6 ">
        <Text className="text-2xl font-semibold text-blue-700">Tasks</Text>
        <View className="flex flex-row">
          <TouchableOpacity
            onPress={() => navigation.navigate("AddTaskOutside", {tasks})}
            className="mr-3">
            <Feather name="plus" size={30} color="blue" />
          </TouchableOpacity>
          <Feather name="search" size={30} color="blue" />
        </View>
      </View>
      <View className="h-0.5 my-3 bg-gray-200"></View>
      <View className="mx-4 mt-2 bg-gray-200 rounded-xl">
        <View className="items-start justify-center">
          <Text className="m-4 text-base font-bold">
            TASKS - {tasks.length}
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
}

export default IssuesScreen