import { View, Text } from "react-native";
import React from "react";

const NothingFlatList = ({ item }) => {
  if (item.length === 0) {
    return (
      <View className="items-center justify-center bg-white rounded-xl p-3 mx-4 my-1.5">
        <Text className="text-lg font-medium text-gray-300">None</Text>
      </View>
    );
  }
};

export default NothingFlatList;
