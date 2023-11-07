import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  getDoneTasksByProjectId,
  getFailedTasksByProjectId,
  getInprogressTasksByProjectId,
  getTodoTasksByProjectId,
} from "../../../services/task";
import { FontAwesome5 } from "@expo/vector-icons";
import { getProjectById } from "../../../services/project";
import Line from "../../../components/Line";

const BroadScreen = ({ route, navigation }) => {
  const { project } = route.params;
  const [todo, setTodo] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [done, setDone] = useState([]);
  const [failed, setFailed] = useState([]);

  const Stage = [
    {
      id: "1",
      title: "To do",
      data: todo,
    },
    {
      id: "2",
      title: "In progress",
      data: inprogress,
    },
    {
      id: "3",
      title: "Done",
      data: done,
    },
    {
      id: "4",
      title: "Failed",
      data: failed,
    },
  ];

  const [name, setName] = useState("");
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getProjectById(project.id)
        .then((response) => {
          setName(response.data.name);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return () => unsubscribe();
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getTodoTasksByProjectId(project.id)
        .then((response) => {
          setTodo(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return () => unsubscribe();
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getInprogressTasksByProjectId(project.id)
        .then((response) => {
          setInprogress(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
    return () => unsubscribe();
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDoneTasksByProjectId(project.id)
        .then((response) => {
          setDone(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return () => unsubscribe();
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getFailedTasksByProjectId(project.id)
        .then((response) => {
          setFailed(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return () => unsubscribe();
  }, [navigation]);

  const StageFlatList = ({ item }) => {
    if (item.data.length === 0) {
      return (
        <View className="w-screen bg-gray-100">
          <View className="items-start justify-center">
            <Text className="mx-6 my-2 text-lg font-semibold">
              {item.title} - {item.data.length}
            </Text>
          </View>
          <View className="items-center justify-center bg-white rounded-xl p-3 mx-6 my-1.5">
            <Text className="text-base font-medium text-gray-300">No data</Text>
          </View>
        </View>
      );
    }

    return (
      <View className="w-screen bg-gray-100 h-fit ">
        <View className="items-start justify-center">
          <Text className="mx-6 my-2 text-lg font-semibold">
            {item.title} - {item.data.length}
          </Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={{ paddingBottom: 10 }}
          data={item.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => {
            let color;
            switch (item.priority) {
              case "LOW":
                color = "forestgreen";
                break;
              case "MEDIUM":
                color = "gold";
                break;
              case "HIGH":
                color = "red";
                break;
              default:
                color = "black";
            }
            return (
              <TouchableOpacity
                style={{ borderLeftColor: color, borderLeftWidth: 10 }}
                className="flex flex-col px-3 py-1 mx-6 my-1 bg-white rounded-lg"
                onPress={() => navigation.navigate("DetailTask", { item })}>
                <Text className="text-base font-medium">{item.name}</Text>
                <Text className="mb-1 text-slate-400">
                  {item.description != "" ? item.description : "No description"}
                </Text>
                <View className="flex flex-row justify-between">
                  <View className="flex flex-row items-center">
                    <FontAwesome5 name="calendar-alt" size={20} color="blue" />
                    <Text className="ml-2 text-slate-400">{item.endDate}</Text>
                  </View>
                  <Text className="">
                    {item.assigneeUser ? item.assigneeUser.username : ""}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <View className="flex flex-row items-center justify-between mx-6 ">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex flex-row items-center justify-center">
          <FontAwesome5 name="arrow-left" size={20} color="blue" />
          <Text className="ml-3 text-xl font-semibold text-blue-700">
            {name}
          </Text>
        </TouchableOpacity>
        <View className="flex flex-row">
          <TouchableOpacity
            onPress={() => navigation.navigate("DetailScreen", { project })}
            className="mr-3">
            <FontAwesome5 name="info" size={20} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddTaskInside", { project })}
            className="">
            <FontAwesome5 name="plus" size={20} color="blue" />
          </TouchableOpacity>
        </View>
      </View>
      <Line />
      <View className="flex-1">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled
          pagingEnabled={true}
          contentContainerStyle={{}}
          data={Stage}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => <StageFlatList item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default BroadScreen;
