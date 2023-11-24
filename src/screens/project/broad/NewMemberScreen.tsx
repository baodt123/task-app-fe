import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
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
  const [searchTerm, setSearchTerm] = useState("");
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
    Alert.alert(
      "Confirmation",
      "Are you sure you want to assign this user to the task?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await assigneeMemberToTask(id, username);
              ToastAlert(
                "success",
                "Success",
                "Member was assigned to project"
              );
              navigation.goBack();
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
      { cancelable: false }
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
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
      <Line />
      <View className="p-2 mx-6 my-2 bg-white rounded-xl">
        <TextInput
          className="ml-2 text-base font-medium"
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
          placeholder="Assign user to this task"
        />
      </View>
      <View className="justify-center p-4 mx-6 my-3 bg-white rounded-xl">
        <NothingFlatList item={members} />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={members.filter((item) =>
            item.username.toLowerCase().includes(searchTerm.toLowerCase())
          )}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              className="flex flex-row items-center mb-4"
              onPress={() => handleAddMember(taskId, item.username)}>
              <FontAwesome5
                name="user-plus"
                size={20}
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
