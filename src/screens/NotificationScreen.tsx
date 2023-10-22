import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getMessage } from "../services/user";
import Line from "../components/Line";
import NothingFlatList from "../components/NothingFlatList";

const NotificationScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessage()
      .then((response) => {
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

  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <View className="flex flex-row items-center justify-between mx-6 ">
        <Text className="text-2xl font-semibold text-blue-700">
          Notifications
        </Text>
      </View>
      <Line />
      <View className="mx-4 mt-2 bg-gray-200 rounded-xl">
        <View className="items-start justify-center">
          <Text className="m-4 text-lg font-bold">
            Messages - {messages.length}
          </Text>
        </View>
        <NothingFlatList item={messages}/>
        <FlatList
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={{ paddingBottom: 20 }}
          data={messages}
          renderItem={({ item, index }) => {
            const parts = item.split("\n");
            return (
              <TouchableOpacity
                className="flex flex-col p-3 my-1.5 mx-3 bg-white rounded-lg"
                onPress={() => navigation.navigate("Task")}>
                <Text className="text-lg font-bold ">{parts[0]}</Text>
                <Text className="text-base">{parts[1]}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;
