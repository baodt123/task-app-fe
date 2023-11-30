import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { convertTime, getTaskByAssigneeUser } from "../../services/task";
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
  
  const getStatusTextAndColor = (status) => {
    switch (status) {
      case "TODO":
        return { text: "TO DO"};
      case "IN_PROGRESS":
        return { text: "IN PROGRESS" };
      case "DONE":
        return { text: "DONE"};
      default:
        return { text: ""};
    }
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
          <Text className="text-xl font-semibold text-blue-700">Task</Text>
        </View>
        <View className="flex flex-row">
          <TouchableOpacity
            onPress={() => navigation.navigate("AddTaskOutside", { tasks })}
            className="">
            <FontAwesome5 name="plus" size={20} color="blue" />
          </TouchableOpacity>
        </View>
      </View>
      <Line />
      <View className="mx-3">
        <View className="items-start justify-center">
          <Text className="mx-3 my-2 text-lg font-semibold">
            Assigned to Me - {tasks.length}
          </Text>
        </View>
        <NothingFlatList item={tasks} />
        <FlatList
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={{ paddingBottom: 50 }}
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => {
            let color;
            switch (item.priority) {
              case "LOW":
                color = "forestgreen";
                break;
              case "MEDIUM":
                color = "goldenrod";
                break;
              case "HIGH":
                color = "red";
                break;
              default:
                color = "black";
            }
            return (
              <TouchableOpacity
                style={{ borderLeftColor: color, borderLeftWidth: 8 }}
                className="flex flex-col px-3 py-1 mx-3 my-1 bg-white rounded-lg"
                onPress={() => navigation.navigate("DetailTask", { item })}>
                <Text className="text-base font-medium">{item.name}</Text>
                <Text className="mb-1 text-gray-400">
                  {item.description != "" ? item.description : "No description"}
                </Text>
                <View className="flex flex-row justify-between">
                  <View className="flex flex-row items-center">
                    <FontAwesome5 name="calendar-alt" size={20} color="red" />
                    <Text className="ml-2 text-gray-400">
                      {convertTime(item.endDate)}
                    </Text>
                  </View>
                  <Text className="text-base">
                    {getStatusTextAndColor(item.status).text}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default IssuesScreen;
