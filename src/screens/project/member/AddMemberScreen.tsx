import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  addMemberToProject,
  findUsersNotInProject,
} from "../../../services/project";

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
      navigation.navigate("MemberScreen", { project });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <View className="flex flex-row items-center justify-between mx-6 ">
        <Text className="text-2xl font-semibold text-blue-700">
          {project.name}
        </Text>
      </View>
      <View className="h-0.5 mt-3 bg-gray-200"></View>
      <View className="mx-6">
        <Text className="mb-6 text-base">Add user to project</Text>
        <FlatList
          data={members}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              className="flex flex-row items-center mb-4"
              onPress={() => handleAddMember(project.id, item.username)}>
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

export default AddMemberScreen;
