import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { createNewTask } from "../../../services/task";
import { ToastAlert } from "../../../components/ToastAlert";
import { FontAwesome5 } from "@expo/vector-icons";
import Line from "../../../components/Line";


const AddTaskInside = ({ route, navigation }) => {
  const { project } = route.params;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [start, setStart] = useState(new Date().toDateString());
  const [end, setEnd] = useState(new Date().toDateString());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [priority, setPriority] = useState("LOW");

  function addOneDay(date: Date): Date {
    return new Date(date.setDate(date.getDate() + 1));
  }
  
  const handleCreateTask = async () => {
    const taskRequest = {
      name,
      description,
      startDate: addOneDay(new Date(start)),
      endDate: addOneDay(new Date(end)),
      priority,
    };
    if(!taskRequest.name || taskRequest.name.length > 13 ){
      ToastAlert("error", "Error", "Name is required and less than 13!");
      return;
    }
    if (taskRequest.startDate > taskRequest.endDate) {
      ToastAlert("error", "Error", "Start date cannot be after end date!");
      return;
    }
    try {
      await createNewTask(project.id, taskRequest);
      ToastAlert("success", "Success", "Create task success!");
      navigation.goBack();
    } catch (error) {
      ToastAlert("error", "Error", "Name already been used!");
    }
  };


  const toggleStartPicker = () => {
    setShowStartPicker(!showStartPicker);
  };

  const toggleEndPicker = () => {
    setShowEndPicker(!showEndPicker);
  };

  const changeDate1 = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate1(currentDate);
      setStart(currentDate.toDateString());
      toggleStartPicker();
    } else {
      toggleStartPicker();
    }
  };

  const changeDate2 = ({ type }, selectedDate1) => {
    if (type == "set") {
      const currentDate = selectedDate1;
      setDate2(currentDate);
      setEnd(currentDate.toDateString());
      toggleEndPicker();
    } else {
      toggleEndPicker();
    }
  };

  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="flex flex-row items-center ml-6">
        <FontAwesome5 name="arrow-left" size={24} color="blue" />
        <Text className="ml-4 text-2xl font-semibold text-blue-700">
          Create new task
        </Text>
      </TouchableOpacity>
      <Line />
      <View className="justify-center p-4 m-6 bg-gray-200 rounded-xl">
        <Text className="text-xl font-medium ">Name</Text>
        <View className="flex flex-row py-2 mb-2 text-lg border-b border-gray-400">
          <TextInput
            className="flex-grow text-lg"
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <Text className="text-xl font-medium ">Description</Text>
        <TextInput
          className="py-2 mb-2 text-lg border-b border-gray-400"
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />

        <Text className="text-xl font-medium ">Start</Text>
        {showStartPicker && (
          <View>
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date1}
              onChange={changeDate1}
            />
            <TextInput
              className="py-2 mb-2 text-lg border-b border-gray-400"
              placeholder="Start date"
              value={start}
              onChangeText={setStart}
              editable={false}
            />
          </View>
        )}
        {!showStartPicker && (
          <TouchableOpacity onPress={toggleStartPicker}>
            <TextInput
              className="py-2 mb-2 text-lg border-b border-gray-400"
              placeholder="Start date"
              value={start}
              onChangeText={setStart}
              editable={false}
            />
          </TouchableOpacity>
        )}

        <Text className="text-xl font-medium ">End</Text>
        {showEndPicker && (
          <View>
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date2}
              onChange={changeDate2}
            />
            <TextInput
              className="py-2 mb-2 text-lg border-b border-gray-400"
              placeholder="End date"
              value={end}
              onChangeText={setEnd}
              editable={false}
            />
          </View>
        )}
        {!showEndPicker && (
          <TouchableOpacity onPress={toggleEndPicker}>
            <TextInput
              className="py-2 mb-2 text-lg border-b border-gray-400"
              placeholder="End date"
              value={end}
              onChangeText={setEnd}
              editable={false}
            />
          </TouchableOpacity>
        )}
        <Text className="text-xl font-medium ">Priority</Text>
        <View className="-ml-3.5">
          <Picker
            selectedValue={priority}
            onValueChange={(itemValue) => setPriority(itemValue)}>
            <Picker.Item label="LOW" value="LOW" />
            <Picker.Item label="MEDIUM" value="MEDIUM" />
            <Picker.Item label="HIGH" value="HIGH" />
          </Picker>
        </View>

        <TouchableOpacity
          className="items-center justify-center p-2.5 my-2 bg-blue-700 rounded-xl"
          onPress={handleCreateTask}>
          <Text className="text-xl font-medium text-white">Create Task</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddTaskInside;
