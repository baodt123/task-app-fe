import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getMessage } from "../services/user";

const NotificationScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessage()
      .then((response) => {
        console.log(response.data);
        setMessages(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    const unsubscribe = navigation.addListener("focus", () => {
      getMessage()
        .then((response) => {
          setMessages(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    });

    return () => unsubscribe();
  }, [navigation]);

  const colors = ["blue", "red", "green", "purple", "cyan", "orange"];
  const getColor = (index) => {
    return colors[index % colors.length];
  };
  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <View className="flex flex-row items-center justify-between mx-6 ">
        <Text className="text-2xl font-semibold text-blue-700">
          Notifications
        </Text>
        <Feather name="search" size={30} color="blue" />
      </View>
      <View className="h-0.5 my-3 bg-gray-200"></View>
      <View className="mx-4 mt-2 bg-gray-200 rounded-xl">
        <View className="items-start justify-center">
          <Text className="m-4 text-base font-bold">
            MESSAGES - {messages.length}
          </Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          data={messages}
          renderItem={({ item, index }) => (
            <View className="flex flex-row items-center p-3 m-1.5 bg-white rounded-lg">
              <MaterialCommunityIcons
                name="penguin"
                size={30}
                color={getColor(index)}
              />
              <Text className="ml-3 text-lg font-medium ">{item}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;
