import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  getManagersInProject,
  getMembersInProject,
  getProjectById,
} from "../../../services/project";

const MemberScreen = ({ route, navigation }) => {
  const { project } = route.params;
  const [members, setMembers] = useState([]);
  const [managers, setManagers] = useState([]);
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

  const colors = ["blue", "red", "green", "purple", "cyan", "orange"];

  const getColor = (index) => {
    return colors[index % colors.length];
  };

  useEffect(() => {
    getMembersInProject(project.id)
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const unsubscribe = navigation.addListener("focus", () => {
      getMembersInProject(project.id)
        .then((response) => {
          setMembers(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return () => unsubscribe();
  }, [navigation]);

  useEffect(() => {
    getManagersInProject(project.id)
      .then((response) => {
        setManagers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const unsubscribe = navigation.addListener("focus", () => {
      getManagersInProject(project.id)
        .then((response) => {
          setManagers(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return () => unsubscribe();
  }, [navigation]);

  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <View className="flex flex-row items-center justify-between mx-6 ">
        <Text className="text-2xl font-semibold text-blue-700">{name}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddMemberScreen", { project })}
          className="mr-3">
          <Feather name="plus" size={30} color="blue" />
        </TouchableOpacity>
      </View>
      <View className="h-0.5 mt-3 bg-gray-200"></View>
      <View className="mx-4 mt-2 bg-gray-200 rounded-xl">
        <View className="items-start justify-center">
          <Text className="m-4 text-base font-bold">
            MANAGERS - {managers.length}
          </Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          data={managers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity className="flex flex-row items-center p-3 m-1.5 bg-white rounded-lg">
              <MaterialCommunityIcons
                name="penguin"
                size={30}
                color={getColor(index)}
              />
              <Text className="ml-3 text-lg font-medium ">{item.username}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View className="mx-4 mt-6 bg-gray-200 rounded-xl">
        <View className="items-start justify-center">
          <Text className="m-4 text-base font-bold">
            MEMBERS - {members.length}
          </Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={{ paddingBottom: 250 }}
          data={members}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity className="flex flex-row items-center p-3 m-1.5 bg-white rounded-lg">
              <MaterialCommunityIcons
                name="penguin"
                size={30}
                color={getColor(index)}
              />
              <Text className="ml-3 text-lg font-medium ">{item.username}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default MemberScreen;
