import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  getManagersInProject,
  getMembersInProject,
  getProjectById,
  outProject,
} from "../../../services/project";
import { ToastAlert } from "../../../components/ToastAlert";
import Line from "../../../components/Line";
import NothingFlatList from "../../../components/NothingFlatList";

const MemberScreen = ({ route, navigation }) => {
  const { project } = route.params;
  const [members, setMembers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [name, setName] = useState("");
  useEffect(() => {
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

  const colors = ["blue", "red", "green", "purple", "orange"];

  const getColor = (index) => {
    return colors[index % colors.length];
  };

  useEffect(() => {
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

  const handleOut = async () => {
    try {
      await outProject(project.id);
      ToastAlert("success", "Success", "Out project success!");
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
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
            onPress={() => navigation.navigate("AddMemberScreen", { project })}
            className="mr-3">
            <FontAwesome5 name="user-plus" size={20} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOut} className="">
            <FontAwesome5 name="door-open" size={20} color="blue" />
          </TouchableOpacity>
        </View>
      </View>
      <Line />
      <View>
        <FlatList
          data={name}
          renderItem={({ item, index }) => <View></View>}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={{ paddingBottom: 80 }}
          ListHeaderComponent={
            <View className="mx-3 mt-2 bg-gray-200 rounded-xl">
              <View className="items-start justify-center">
                <Text className="mx-4 mt-2 text-lg font-semibold">
                  Managers - {managers.length}
                </Text>
              </View>
              <NothingFlatList item={managers} />
              <FlatList
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
                data={managers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                  <TouchableOpacity className="flex flex-row items-center p-3 mx-3 my-1.5 bg-white rounded-lg">
                    <FontAwesome5
                      name="user-cog"
                      size={20}
                      color={getColor(index)}
                    />
                    <Text className="ml-3 text-lg font-medium ">
                      {item.username}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          }
          ListFooterComponent={
            <View className="mx-3 mt-3 bg-gray-200 rounded-xl">
              <View className="items-start justify-center">
                <Text className="mx-4 mt-2 text-lg font-semibold">
                  Members - {members.length}
                </Text>
              </View>
              <NothingFlatList item={members} />
              <FlatList
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
                data={members}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                  <TouchableOpacity className="flex flex-row items-center p-3 mx-3 my-1.5 bg-white rounded-lg">
                    <FontAwesome5
                      name="user-alt"
                      size={20}
                      color={getColor(index)}
                    />
                    <Text className="ml-3 text-base font-semibold ">
                      {item.username}
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

export default MemberScreen;
