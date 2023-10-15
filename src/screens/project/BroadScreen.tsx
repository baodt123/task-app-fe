import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { Feather } from "@expo/vector-icons";

const BroadScreen = ({ route, navigation }) => {
  const { project } = route.params;
  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <View className="flex flex-row items-center justify-between mx-6 ">
        <Text className="text-2xl font-semibold text-blue-700">
          {project.name}
        </Text>
        <View className="flex flex-row">
          <TouchableOpacity
            onPress={() => navigation.navigate("AddTaskInside", project)}
            className="mr-3">
            <Feather name="plus" size={30} color="blue" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="h-0.5 mt-3 bg-gray-200"></View>
      <View className='mx-6'>
        <Text className="mb-6 text-base">Backlog</Text>
      </View>
    </SafeAreaView>
  );
};

export default BroadScreen