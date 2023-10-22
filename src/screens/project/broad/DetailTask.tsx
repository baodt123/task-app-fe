import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ToastAlert } from "../../../components/ToastAlert";
import {
  changeStatusTask,
  deleteTask,
  getTaskById,
  updateTaskById,
} from "../../../services/task";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import Line from "../../../components/Line";

const DetailTask = ({ route, navigation }) => {
  const { item } = route.params;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState(new Date().toDateString());
  const [end, setEnd] = useState(new Date().toDateString());
  const [priority, setPriority] = useState("LOW");
  const [creator, setCreator] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState("");

  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [isMe, setIsMe] = useState(false);

  const choice = [
    {
      id: "1",
      title: "BACK LOG",
      value: "BACKLOG",
    },
    {
      id: "2",
      title: "TO DO",
      value: "TODO",
    },
    {
      id: "3",
      title: "IN PROGRESS",
      value: "IN_PROGRESS",
    },
    {
      id: "4",
      title: "DONE",
      value: "DONE",
    },
    {
      id: "5",
      title: "FAILED",
      value: "FAILED",
    },
  ];

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
  function addOneDay(date: Date): Date {
    return new Date(date.setDate(date.getDate() + 1));
  }

  useEffect(() => {
    getTaskById(item.id)
      .then((response) => {
        setName(response.data.name);
        setDescription(response.data.description);
        setStart(response.data.startDate);
        setEnd(response.data.endDate);
        setPriority(response.data.priority);
        setStatus(response.data.status);
        setCreator(response.data.creatorUser.username);
        setAssignee(response.data.assigneeUser.username);
      })
      .catch((error) => {
        console.log(error);
      });

    const unsubscribe = navigation.addListener("focus", () => {
      getTaskById(item.id)
        .then((response) => {
          setName(response.data.name);
          setDescription(response.data.description);
          setStart(response.data.startDate);
          setEnd(response.data.endDate);
          setPriority(response.data.priority);
          setStatus(response.data.status);
          setCreator(response.data.creatorUser.username);
          setAssignee(response.data.assigneeUser.username);
        })
        .catch((error) => {
          console.log(error)
        });
    });

    return () => unsubscribe();
  }, [navigation]);

  const handleUpdate = async () => {
    const taskUpdate = {
      name,
      description,
      startDate: addOneDay(new Date(start)),
      endDate: addOneDay(new Date(end)),
      priority,
    };
    if (!taskUpdate.name) {
      ToastAlert("error", "Error", "Name is required!");
      return;
    }
    if (taskUpdate.startDate > taskUpdate.endDate) {
      ToastAlert("error", "Error", "Start date cannot be after end date!");
      return;
    }
    try {
      await updateTaskById(taskUpdate, item.id);
      ToastAlert("success", "Success", "Create success!");
      setIsEditing(false);
    } catch (error) {
      ToastAlert("error", "Error", "Name already been used!");
    }
  };

  const handleStatus = async () => {
    const choice = {
      status: newStatus,
    };
    try {
      await changeStatusTask(choice, item.id);
      ToastAlert("success", "Success", "Change status success!");
      navigation.goBack();
    } catch (error) {
      ToastAlert("error", "Error", "Error when change status!");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(item.id);
      ToastAlert("success", "Success", "Delete task success!");
      navigation.goBack();
    } catch (error) {
      ToastAlert("error", "Error", "Error when delete task!");
    }
  }

  useEffect(() => {
    if (newStatus !== "") {
      handleStatus();
    }
  }, [newStatus]);

  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <View className="flex flex-row items-center justify-between mx-6 ">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex flex-row items-center justify-center">
          <FontAwesome5 name="arrow-left" size={24} color="blue" />
          <Text className="ml-4 text-2xl font-semibold text-blue-700">
            {name}
          </Text>
        </TouchableOpacity>

        {!isEditing && (
          <View className="flex flex-row">
            <TouchableOpacity
              className="mr-3"
              onPress={() => setIsEditing(true)}>
              <FontAwesome5 name="edit" size={24} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity className="mr-3" onPress={handleDelete}>
              <FontAwesome5 name="trash" size={24} color="blue" />
            </TouchableOpacity>
          </View>
        )}
        {isEditing && (
          <View className="flex flex-row">
            <TouchableOpacity className="mr-3" onPress={handleUpdate}>
              <FontAwesome5 name="check" size={24} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity
              className="mr-3"
              onPress={() => {
                setIsEditing(false);
              }}>
              <FontAwesome5 name="window-close" size={24} color="blue" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Line />

      <View className="justify-center p-4 mx-6 my-3 bg-gray-200 rounded-xl">
        <Text className="text-xl font-medium ">Name</Text>
        {!isEditing && <Text className="py-2 mb-2 text-lg ">{name}</Text>}
        {isEditing && (
          <View className="flex flex-row py-2 mb-2 text-lg border-b border-gray-400">
            <TextInput
              className="flex-grow text-lg"
              value={name}
              onChangeText={setName}
            />
          </View>
        )}
        <Text className="text-xl font-medium ">Description</Text>
        {!isEditing && <Text className="py-2 mb-2 text-lg">{description}</Text>}
        {isEditing && (
          <View className="flex flex-row py-2 mb-2 text-lg border-b border-gray-400">
            <TextInput
              className="flex-grow text-lg"
              value={description}
              onChangeText={setDescription}
            />
          </View>
        )}
        <Text className="text-xl font-medium ">Start</Text>
        {!isEditing && <Text className="py-2 mb-2 text-lg">{start}</Text>}

        {isEditing && showStartPicker && (
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
        {isEditing && !showStartPicker && (
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
        {!isEditing && <Text className="py-2 mb-2 text-lg">{end}</Text>}

        {isEditing && showEndPicker && (
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
        {isEditing && !showEndPicker && (
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
        {!isEditing && <Text className="text-lg">{priority}</Text>}
        {isEditing && (
          <View className="-ml-3.5">
            <Picker
              selectedValue={priority}
              onValueChange={(itemValue) => setPriority(itemValue)}>
              <Picker.Item label="LOW" value="LOW" />
              <Picker.Item label="MEDIUM" value="MEDIUM" />
              <Picker.Item label="HIGH" value="HIGH" />
            </Picker>
          </View>
        )}
      </View>

      <View className="justify-center p-4 mx-6 mb-3 bg-gray-200 rounded-xl">
        <View className="flex flex-row justify-between">
          <Text className="text-xl font-medium ">Creator</Text>
          <Text className="text-lg">{creator}</Text>
        </View>
        <View className="flex flex-row justify-between">
          <View className="flex flex-row">
            <Text className="text-xl font-medium ">Assignee</Text>
            <TouchableOpacity
              className="justify-center ml-4"
              onPress={() => navigation.navigate("NewMemberScreen", { item })}>
              <FontAwesome5 name="user-plus" size={18} color="blue" />
            </TouchableOpacity>
          </View>
          <Text className="text-lg">{assignee}</Text>
        </View>
      </View>
      <View className="justify-center p-4 mx-6 bg-gray-200 rounded-xl">
        <View className="flex flex-row justify-between mb-2">
          <Text className="text-xl font-medium ">Status</Text>
          <Text className="text-lg">{status}</Text>
        </View>
        <View className="items-center justify-between">
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{}}
            data={choice.filter((item) => item.value !== status)}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                className="p-1.5 m-1 bg-blue-700 rounded-xl"
                onPress={() => {
                  setNewStatus(item.value);
                }}>
                <Text className="font-bold text-white text-md">
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailTask;
