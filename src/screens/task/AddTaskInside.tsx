import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";

const AddTaskInside = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPriority, setSelectedPriority] = useState("Low");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handlePriorityChange = (priority) => {
    setSelectedPriority(priority);
  };

  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <ScrollView className="flex-1">
        <View className="flex flex-row items-center justify-between mx-6 ">
          <Text className="text-2xl font-semibold text-blue-700">Task</Text>
        </View>
        <View className="h-0.5 my-3 bg-gray-200"></View>
        <View className="mx-6">
          <Text className="text-xl font-medium ">Name</Text>
          <View className="flex flex-row py-2 mb-2 text-lg border-b border-gray-400">
            <TextInput
              className="flex-grow text-lg"
              placeholder="Name"
            />
          </View>
          <Text className="text-xl font-medium ">Description</Text>
          <TextInput
            className="py-2 mb-2 text-lg border-b border-gray-400"
            placeholder="Description"
          />

          <Text className="text-xl font-medium ">Start</Text>
          <Calendar
            className="border"
            date={selectedDate}
            onDateChange={handleDateChange}
          />
          <Text className="text-xl font-medium ">End</Text>
          <Calendar
            className="border"
            date={selectedDate}
            onDateChange={handleDateChange}
          />
          <Text className="text-xl font-medium ">Priority</Text>
          <View className="flex flex-row justify-center">
            <TouchableOpacity
              className="items-center justify-center p-2.5 my-2 bg-green-500 rounded-xl"
              onPress={() => handlePriorityChange("Low")}>
              <Text className="text-xl font-medium text-white">Low</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="items-center justify-center p-2.5 my-2 bg-yellow-500 rounded-xl"
              onPress={() => handlePriorityChange("Medium")}>
              <Text className="text-xl font-medium text-white">Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="items-center justify-center p-2.5 my-2 bg-red-700 rounded-xl"
              onPress={() => handlePriorityChange("High")}>
              <Text className="text-xl font-medium text-white">High</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="items-center justify-center p-2.5 my-2 bg-blue-700 rounded-xl">
            <Text className="text-xl font-medium text-white">Create Task</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddTaskInside;
