import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

const ProjectHome = ({ route, navigation }) => {
  const { project } = route.params;
  
  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <View className="flex flex-row items-center justify-between mx-6 ">
        <Text className="text-2xl font-semibold text-blue-700">
          {project.name}
        </Text>
      </View>
      <View className="h-0.5 mt-3 bg-gray-200"></View>

      <View className="mx-6">
        <TouchableOpacity
          className="border-b border-b-gray-300"
          onPress={() => navigation.navigate("BroadScreen", { project })}>
          <Text className="py-4 text-xl">Board</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="border-b border-b-gray-300"
          onPress={() => navigation.navigate("DetailScreen", { project })}>
          <Text className="py-4 text-xl">Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="border-b border-b-gray-300"
          onPress={() => navigation.navigate("MemberScreen", { project })}>
          <Text className="py-4 text-xl">Member</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProjectHome;
