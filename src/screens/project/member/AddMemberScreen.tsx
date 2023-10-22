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
  addMemberToProject,
  findUsersNotInProject,
} from "../../../services/project";
import Line from "../../../components/Line";
import { ToastAlert } from "../../../components/ToastAlert";

const AddMemberScreen = ({ route, navigation }) => {
  const { project } = route.params;
  const [members, setMembers] = useState([]);
  const colors = ["blue", "red", "green", "purple", "cyan", "orange"];

  const getColor = (index) => {
    return colors[index % colors.length];
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await findUsersNotInProject(project.id);
        setMembers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMembers();
  }, []);

  const handleAddMember = async (id: any, username: string) => {
    try {
      await addMemberToProject(id, username);
      ToastAlert("success", "Success", "New member was added to project!");
      navigation.navigate("MemberScreen", { project });
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
          <FontAwesome5 name="arrow-left" size={22} color="blue" />
          <Text className="ml-4 text-2xl font-semibold text-blue-700">
            {project.name}
          </Text>
        </TouchableOpacity>
      </View>
      <Line />
      <View className="mx-6 ">
        <Text className="my-3 text-lg font-bold">
          Add user to project - {members.length}
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={{ paddingBottom: 120 }}
          data={members}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              className="flex flex-row items-center p-3 my-1.5 bg-white rounded-lg"
              onPress={() => handleAddMember(project.id, item.username)}>
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

export default AddMemberScreen;
