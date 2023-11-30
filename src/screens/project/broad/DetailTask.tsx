import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { ToastAlert } from "../../../components/ToastAlert";
import {
  changeStatusTask,
  convertTime,
  deleteTask,
  getTaskById,
  updateTaskById,
} from "../../../services/task";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import Line from "../../../components/Line";
import { getUsername } from "../../../services/user";

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
  const [original, setOriginal] = useState();


  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  const choice = [
    {
      id: "1",
      title: "TO DO",
      value: "TODO",
    },
    {
      id: "2",
      title: "IN PROGRESS",
      value: "IN_PROGRESS",
    },
    {
      id: "3",
      title: "DONE",
      value: "DONE",
    },
    {
      id: "4",
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
    const unsubscribe = navigation.addListener("focus", () => {
      getTaskById(item.id)
        .then((response) => {
          setOriginal(response.data);
          setName(response.data.name);
          setDescription(response.data.description);
          setStart(response.data.startDate);
          setEnd(response.data.endDate);
          setPriority(response.data.priority);
          setStatus(response.data.status);
          setCreator(response.data.creatorUser.username);
          setAssignee(response.data.assigneeUser.username);
        })
        .catch((error) => {});
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
        username: await getUsername(),
      };
      if (
        taskUpdate.name === item.name &&
        taskUpdate.description === item.description &&
        taskUpdate.priority === item.priority
      ) {
        setIsEditing(false);
        return;
      }

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
        ToastAlert("success", "Success", "Update success!");
        setIsEditing(false);
      } catch (error) {
        ToastAlert("error", "Error", "Name already been used!");
      }
    };


  const getStatusTextAndColor = (status) => {
    switch (status) {
      case "TODO":
        return { text: "TO DO" };
      case "IN_PROGRESS":
        return { text: "IN PROGRESS" };
      case "DONE":
        return { text: "DONE" };
      default:
        return { text: "" };
    }
  };

  const handleStatus = async () => {
    const choice = {
      status: newStatus,
      username: await getUsername(),
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
  Alert.alert(
    "Confirmation",
    "Are you sure you want to delete this task?",
    [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          try {
            await deleteTask(item.id);
            ToastAlert("success", "Success", "Delete task success!");
            navigation.goBack();
          } catch (error) {
            ToastAlert("error", "Error", "Error when delete task!");
          }
        },
      },
    ],
    { cancelable: false }
  );
};

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
          <FontAwesome5 name="arrow-left" size={20} color="blue" />
          <Text className="ml-3 text-xl font-semibold text-blue-700">
            {name}
          </Text>
        </TouchableOpacity>

        {!isEditing && (
          <View className="flex flex-row">
            <TouchableOpacity
              className="mr-3"
              onPress={() => setIsEditing(true)}>
              <FontAwesome5 name="edit" size={20} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity className="" onPress={handleDelete}>
              <FontAwesome5 name="trash" size={20} color="blue" />
            </TouchableOpacity>
          </View>
        )}
        {isEditing && (
          <View className="flex flex-row">
            <TouchableOpacity className="mr-3" onPress={handleUpdate}>
              <FontAwesome5 name="check" size={20} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity
              className=""
              onPress={() => {
                setIsEditing(false);
                setName(original.name);
                setDescription(original.description);
                setStart(original.startDate);
                setEnd(original.endDate);
                setPriority(original.priority);
              }}>
              <FontAwesome name="close" size={22} color="blue" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Line />

      <View className="justify-center p-4 mx-6 my-2 bg-gray-200 rounded-xl">
        <Text className="text-lg font-semibold">Name</Text>
        {!isEditing && <Text className="py-1 text-lg ">{name}</Text>}
        {isEditing && (
          <View className="flex flex-row py-1 text-lg border-b border-gray-400">
            <TextInput
              className="flex-grow text-lg"
              value={name}
              onChangeText={setName}
            />
          </View>
        )}
        <Text className="text-lg font-semibold">Description</Text>
        {!isEditing && <Text className="py-1 text-lg ">{description}</Text>}
        {isEditing && (
          <View className="flex flex-row py-1 text-lg border-b border-gray-400">
            <TextInput
              className="flex-grow text-lg"
              value={description}
              onChangeText={setDescription}
            />
          </View>
        )}
        <Text className="text-lg font-semibold">Start</Text>
        {!isEditing && (
          <Text className="py-1 text-lg ">{convertTime(start)}</Text>
        )}

        {isEditing && showStartPicker && (
          <View>
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date1}
              onChange={changeDate1}
            />
            <TextInput
              className="py-1 text-lg border-b border-gray-400"
              placeholder="Start date"
              value={convertTime(start)}
              onChangeText={setStart}
              editable={false}
            />
          </View>
        )}
        {isEditing && !showStartPicker && (
          <TouchableOpacity onPress={toggleStartPicker}>
            <TextInput
              className="py-1 text-lg border-b border-gray-400"
              placeholder="Start date"
              value={convertTime(start)}
              onChangeText={setStart}
              editable={false}
            />
          </TouchableOpacity>
        )}
        <Text className="text-lg font-semibold">End</Text>
        {!isEditing && (
          <Text className="py-1 text-lg ">{convertTime(end)}</Text>
        )}

        {isEditing && showEndPicker && (
          <View>
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date2}
              onChange={changeDate2}
            />
            <TextInput
              className="py-1 text-lg border-b border-gray-400"
              placeholder="End date"
              value={convertTime(end)}
              onChangeText={setEnd}
              editable={false}
            />
          </View>
        )}
        {isEditing && !showEndPicker && (
          <TouchableOpacity onPress={toggleEndPicker}>
            <TextInput
              className="py-1 text-lg border-b border-gray-400"
              placeholder="End date"
              value={convertTime(end)}
              onChangeText={setEnd}
              editable={false}
            />
          </TouchableOpacity>
        )}

        <Text className="text-lg font-semibold">Priority</Text>
        {!isEditing && <Text className="py-1 text-lg">{priority}</Text>}
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
          <Text className="text-lg font-semibold">Creator</Text>
          <Text className="text-lg">{creator}</Text>
        </View>
        <View className="flex flex-row justify-between">
          <View className="flex flex-row">
            <Text className="text-lg font-semibold">Assignee</Text>
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
          <Text className="text-lg font-semibold">Status</Text>
          <Text className="text-lg">
            {getStatusTextAndColor(item.status).text}
          </Text>
        </View>
        <View className="items-center justify-between">
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{}}
            data={choice.filter((item) => item.value !== status)}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => {
              let color: any;
              switch (item.title) {
                case "TODO":
                  color = "blue";
                  break;
                case "IN PROGRESS":
                  color = "gold";
                  break;
                case "DONE":
                  color = "green";
                  break;
                case "FAILED":
                  color = "red";
                  break;
                default:
                  color = "blue";
              }
              return (
                <TouchableOpacity
                  style={{ backgroundColor: color }}
                  className="p-1.5 m-1 rounded-xl"
                  onPress={() => {
                    setNewStatus(item.value);
                  }}>
                  <Text className="font-bold text-white text-md">
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailTask;
