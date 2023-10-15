import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from "@expo/vector-icons";

const IssuesScreen = () => {
  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <View className="flex flex-row items-center justify-between mx-6 ">
        <Text className="text-2xl font-semibold text-blue-700">Tasks</Text>
        <View className="flex flex-row">
          <TouchableOpacity
            onPress={() => console.log("Add new project")}
            className="mr-3">
            <Feather name="plus" size={30} color="blue" />
          </TouchableOpacity>
          <Feather name="search" size={30} color="blue" />
        </View>
      </View>
      <View className="h-0.5 my-3 bg-gray-200"></View>
      <View className="mx-6">
        <Text>All projects</Text>
      </View>
    </SafeAreaView>
  );
}

export default IssuesScreen