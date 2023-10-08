import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

const SettingScreen = () => {
  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <View className="flex flex-row items-center justify-between mx-6 ">
        <Text className="text-2xl font-semibold text-blue-700">Setting</Text>
      </View>
      <View className="h-0.5 my-3 bg-gray-200"></View>
      <View className="mx-6">
        <Text>All projects</Text>
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen