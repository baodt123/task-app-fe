import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  BackHandler,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { getProjectsApi } from "../services/project";
import Line from "../components/Line";
import { DrawerActions, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import NothingFlatList from "../components/NothingFlatList";

const HomeScreen = ({ navigation }) => {
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

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("accessToken");
      axios.defaults.headers.common["Authorization"] = null;
    } catch (error) {
      console.log("error when remove token", error);
    }
    navigation.navigate("LoginScreen");
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Exit", "Are you sure to log out?", [
          {
            text: "No",
            onPress: () => null,
            style: "cancel",
          },
          { text: "Yes", onPress: handleLogout },
        ]);

        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  function convertTime(timeString: string) {
    let date = new Date(timeString);
    date.setHours(date.getHours() + 7);
    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();

    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let monthName = months[monthIndex];

    return `${day < 10 ? "0" : ""}${day} ${monthName} ${year} ${
      hour < 10 ? "0" : ""
    }${hour}:${minute < 10 ? "0" : ""}${minute}`;
  }

  function filterTime(time: string){
    let date = new Date(time);
    date.setHours(date.getHours() + 14);
    return date.toISOString().split(".")[0].replace("T", " ");
  }

  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <View className="flex flex-row items-center justify-between mx-6">
        <View className="flex flex-row items-center justify-center">
          <TouchableOpacity
            className="mr-3"
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <FontAwesome5 name="bars" size={20} color="blue" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-blue-700">Activity</Text>
        </View>
      </View>
      <Line />
      <View className="mx-3">
        <View className="items-start justify-center">
          <Text className="mx-3 my-2 text-lg font-semibold">
            Today streams -{" "}
            {
              projects
                .filter((project) => {
                  const todayStreams = project.streams.filter((stream) => {
                    const streamDate = new Date(filterTime(stream.time));
                    streamDate.setHours(0, 0, 0, 0);
                    return streamDate.getTime() === today.getTime();
                  });
                  return todayStreams.length > 0;
                })
                .sort((a, b) => {
                  const aLatestStreamTime = new Date(
                    a.streams[a.streams.length - 1].time
                  );
                  const bLatestStreamTime = new Date(
                    b.streams[b.streams.length - 1].time
                  );
                  return bLatestStreamTime - aLatestStreamTime;
                }).length
            }
          </Text>
        </View>
        <NothingFlatList
          item={projects
            .filter((project) => {
              const todayStreams = project.streams.filter((stream) => {
                const streamDate = new Date(filterTime(stream.time));
                streamDate.setHours(0, 0, 0, 0);
                return streamDate.getTime() === today.getTime();
              });
              return todayStreams.length > 0;
            })
            .sort((a, b) => {
              const aLatestStreamTime = new Date(
                a.streams[a.streams.length - 1].time
              );
              const bLatestStreamTime = new Date(
                b.streams[b.streams.length - 1].time
              );
              return bLatestStreamTime - aLatestStreamTime;
            })}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={{ paddingBottom: 100 }}
          data={projects
            .filter((project) => {
              const todayStreams = project.streams.filter((stream) => {
                const streamDate = new Date(filterTime(stream.time));
                streamDate.setHours(0, 0, 0, 0);
                return streamDate.getTime() === today.getTime();
              });
              return todayStreams.length > 0;
            })
            .sort((a, b) => {
              const aLatestStreamTime = new Date(
                a.streams[a.streams.length - 1].time
              );
              const bLatestStreamTime = new Date(
                b.streams[b.streams.length - 1].time
              );
              return bLatestStreamTime - aLatestStreamTime;
            })}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View className="flex flex-col p-3 mx-3 my-1 bg-white rounded-lg">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("BroadScreen", { project: item })
                }>
                <View className="flex flex-row items-center px-2 mb-2">
                  <FontAwesome5
                    name="folder-minus"
                    size={20}
                    color={getColor(index)}
                  />
                  <Text className="ml-2 text-base font-semibold">
                    {item.name}
                  </Text>
                </View>
                <FlatList
                  data={item.streams
                    .filter((stream) => {
                      const streamDate = new Date(filterTime(stream.time));
                      streamDate.setHours(0, 0, 0, 0);
                      return streamDate.getTime() === today.getTime();
                    })
                    .slice(-5)
                    .reverse()}
                  keyExtractor={(stream) => stream.id.toString()}
                  renderItem={({ item }) => (
                    <View className="flex flex-col px-3 py-1 mx-2 my-1 bg-gray-100 rounded-lg">
                      <View className="flex flex-row">
                        <Text className="text-sm">{item.message}</Text>
                      </View>
                      <View className="items-end mt-1">
                        <Text className="items-end text-sm text-gray-500">
                          {convertTime(item.time)}
                        </Text>
                      </View>
                    </View>
                  )}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
