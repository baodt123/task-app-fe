import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { findAllMembersProject } from "../../../services/project";
import { assigneeMemberToTask } from "../../../services/task";
import Line from "../../../components/Line";
import NothingFlatList from "../../../components/NothingFlatList";
import { ToastAlert } from "../../../components/ToastAlert";

const NewMemberScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [taskId, setTaskId] = useState(item.id);
  const [members, setMembers] = useState([]);
  const colors = ["blue", "red", "green", "purple", "cyan", "orange"];

  const getColor = (index) => {
    return colors[index % colors.length];
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await findAllMembersProject(item.project.id);
        setMembers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMembers();
  }, []);

  const handleAddMember = async (id: any, username: string) => {
    try {
      await assigneeMemberToTask(id, username);
      ToastAlert("success", "Success", "Member was assigned to prject")
      navigation.goBack();
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
          <FontAwesome5 name="arrow-left" size={24} color="blue" />
          <Text className="ml-4 text-2xl font-semibold text-blue-700">
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
      <Line />
      <View className="justify-center p-4 mx-6 my-3 bg-gray-200 rounded-xl">
        <Text className="mb-6 text-lg font-bold">Assigned members to task - {members.length}</Text>
        <NothingFlatList item={members}/>
        <FlatList
          data={members}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              className="flex flex-row items-center mb-4"
              onPress={() => handleAddMember(taskId, item.username)}>
              <FontAwesome5
                name="user-plus"
                size={24}
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

export default NewMemberScreen;
