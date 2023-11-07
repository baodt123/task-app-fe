import { View, Text } from "react-native";
import React from "react";

const NothingFlatList = ({ item }) => {
  if (item.length === 0) {
    return (
      <View className="items-center justify-center rounded-xl p-3 mx-4 my-1.5">
        <Text className="text-base font-semibold text-gray-400">No data</Text>
      </View>
    );
  }
};

export default NothingFlatList;
