import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

const MemberScreen = ({ route, navigation }) => {
  const { project } = route.params;
  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <View className="flex flex-row items-center justify-between mx-6 ">
        <Text className="text-2xl font-semibold text-blue-700">
          {project.name}
        </Text>
      </View>
      <View className="h-0.5 mt-3 bg-gray-200"></View>
    </SafeAreaView>
  );
};

export default MemberScreen