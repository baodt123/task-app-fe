import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import {
  getBacklogTasksByProjectId,
  getDoneTasksByProjectId,
  getFailedTasksByProjectId,
  getInprogressTasksByProjectId,
  getTodoTasksByProjectId,
} from "../../../services/task";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getProjectById } from "../../../services/project";
import { ToastAlert } from "../../../components/ToastAlert";

const BroadScreen = ({ route, navigation }) => {
  const { project } = route.params;
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

  const colors = ["blue", "red", "green", "purple", "cyan", "orange"];
  const getColor = (index) => {
    return colors[index % colors.length];
  };

  // project-info
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

  // backlog-info
  useEffect(() => {
    getBacklogTasksByProjectId(project.id)
      .then((response) => {
        setBacklog(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

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

  // todo-info
  useEffect(() => {
    getTodoTasksByProjectId(project.id)
      .then((response) => {
        setTodo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

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

  // in progress -info
  useEffect(() => {
    getInprogressTasksByProjectId(project.id)
      .then((response) => {
        setInprogress(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

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

  // done-info
  useEffect(() => {
    getDoneTasksByProjectId(project.id)
      .then((response) => {
        setDone(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

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

  //failed-info
  useEffect(() => {
    getFailedTasksByProjectId(project.id)
      .then((response) => {
        setFailed(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

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
    return (
      <View className="mx-1 mt-2 bg-gray-200 w-96 h-fit rounded-xl">
        <View className="items-start justify-center">
          <Text className="m-4 text-base font-bold">
            {item.title} - {item.data.length}
          </Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={{ paddingBottom: 10 }}
          data={item.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              className="flex flex-row items-center p-3 mx-3 my-1.5 bg-white rounded-lg"
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
    );
  };

  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <View className="flex flex-row items-center justify-between mx-6 ">
        <Text className="text-2xl font-semibold text-blue-700">{name}</Text>
        <View className="flex flex-row">
          <TouchableOpacity
            onPress={() => navigation.navigate("AddTaskInside", { project })}
            className="mr-3">
            <Feather name="plus" size={30} color="blue" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="h-0.5 mt-3 bg-gray-300"></View>
      <View className="flex-1 mb-3 bg-gray-200">
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
