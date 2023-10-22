import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
} from "react-native";
import React, {useEffect, useState} from "react";
import {
    getBacklogTasksByProjectId,
    getDoneTasksByProjectId,
    getFailedTasksByProjectId,
    getInprogressTasksByProjectId,
    getTodoTasksByProjectId,
} from "../../../services/task";
import {FontAwesome5} from '@expo/vector-icons';
import {getProjectById} from "../../../services/project";
import Line from "../../../components/Line";

const BroadScreen = ({route, navigation}) => {
    const {project} = route.params;
    const [backlog, setBacklog] = useState([]);
    const [todo, setTodo] = useState([]);
    const [inprogress, setInprogress] = useState([]);
    const [done, setDone] = useState([]);
    const [failed, setFailed] = useState([]);

    const Stage = [
        {
            id: "1",
            title: "BACK LOG",
            data: backlog,
        },
        {
            id: "2",
            title: "TO DO",
            data: todo,
        },
        {
            id: "3",
            title: "IN PROGRESS",
            data: inprogress,
        },
        {
            id: "4",
            title: "DONE",
            data: done,
        },
        {
            id: "5",
            title: "FAILED",
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
            getBacklogTasksByProjectId(project.id)
                .then((response) => {
                    setBacklog(response.data);
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
          <View className="w-screen mt-2 bg-gray-200 rounded-xl">
            <View className="items-start justify-center">
              <Text className="mx-4 mt-1 mb-2 text-lg font-semibold">
                {item.title} - {item.data.length}
              </Text>
            </View>
            <View className="items-center justify-center bg-white rounded-xl p-3 mx-4 my-1.5">
              <Text className="text-lg font-medium text-gray-300">None</Text>
            </View>
          </View>
        );
      }

      return (
        <View className="w-screen mt-2 bg-gray-200 h-fit rounded-xl">
          <View className="items-start justify-center">
            <Text className="mx-4 mt-1 mb-2 text-lg font-semibold">
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
                  className="flex flex-row items-center p-3 mx-4 my-1.5 bg-white rounded-lg"
                  onPress={() => navigation.navigate("DetailTask", { item })}>
                  <FontAwesome5 name="bookmark" size={24} color={color} />
                  <Text className="ml-3 text-lg font-medium">{item.name}</Text>
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
            <FontAwesome5 name="arrow-left" size={24} color="blue" />
            <Text className="ml-4 text-2xl font-semibold text-blue-700">
              {name}
            </Text>
          </TouchableOpacity>
          <View className="flex flex-row">
            <TouchableOpacity
              onPress={() => navigation.navigate("MemberScreen", { project })}
              className="mr-3">
              <FontAwesome5 name="user-friends" size={24} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("DetailScreen", { project })}
              className="mr-3">
              <FontAwesome5 name="info" size={24} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("AddTaskInside", { project })}
              className="mr-3">
              <FontAwesome5 name="plus" size={24} color="blue" />
            </TouchableOpacity>
          </View>
        </View>
        <Line />
        <View className="flex-1 bg-gray-200">
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
