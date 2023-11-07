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
import { DrawerActions } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

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
        <View className="flex flex-row items-center justify-center">
          <TouchableOpacity
            className="mr-3"
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <FontAwesome5 name="bars" size={20} color="blue" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-blue-700">
            Notification
          </Text>
        </View>
      </View>
      <Line />
      <View className="mx-3 mt-2 bg-gray-100 rounded-xl">
        <NothingFlatList item={messages.reverse()} />
        <FlatList
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={{ paddingBottom: 50 }}
          data={messages}
          renderItem={({ item, index }) => {
            const parts = item.split("\n");
            return (
              <TouchableOpacity
                className="flex flex-col px-3 py-2 mx-3 my-1 bg-white rounded-lg"
                onPress={() => navigation.navigate("Task")}>
                <Text className="text-base font-semibold">{parts[0]}</Text>
                <Text className="text-sm text-gray-400">{parts[1]}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;
