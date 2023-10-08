import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Feather } from "@expo/vector-icons";

const NotificationScreen = () => {
  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <View className="flex flex-row items-center justify-between mx-6 ">
        <Text className="text-2xl font-semibold text-blue-700">
          Notifications
        </Text>
        <Feather name="search" size={30} color="blue" />
      </View>
      <View className="h-0.5 my-3 bg-gray-200"></View>
      <View className="mx-6">
        <Text>All projects</Text>
      </View>
    </SafeAreaView>
  );
}

export default NotificationScreen