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
import {
  addMemberToProject,
  findUsersNotInProject,
} from "../../../services/project";
import Line from "../../../components/Line";
import { ToastAlert } from "../../../components/ToastAlert";

const AddMemberScreen = ({ route, navigation }) => {
  const { project } = route.params;
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
  Alert.alert(
    "Confirmation",
    "Are you sure you want to add this user to the project?",
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
            await addMemberToProject(id, username);
            ToastAlert(
              "success",
              "Success",
              "New member was added to project!"
            );
            navigation.navigate("MemberScreen", { project });
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
          <FontAwesome5 name="arrow-left" size={22} color="blue" />
          <Text className="ml-3 text-xl font-semibold text-blue-700">
            {project.name}
          </Text>
        </TouchableOpacity>
      </View>
      <Line />
      <View className="p-2 mx-6 my-2 bg-white rounded-xl">
        <TextInput
          className="ml-2 text-base font-medium"
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
          placeholder="Add user to project"
        />
      </View>
      <View className="mx-6 ">
        <FlatList
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={{ paddingBottom: 120 }}
          data={members.filter((item) =>
            item.username.toLowerCase().includes(searchTerm.toLowerCase())
          )}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              className="flex flex-row items-center p-3 my-1 bg-white rounded-lg"
              onPress={() => handleAddMember(project.id, item.username)}>
              <FontAwesome5
                name="user-plus"
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
    </SafeAreaView>
  );
};

export default AddMemberScreen;
