import {StatusBar} from 'expo-status-bar';
import {SafeAreaView, View} from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";

// @ts-ignore
const WelcomeScreen = ({navigation}) => {
    const timer = setTimeout(() => {
        navigation.navigate('LoginScreen');
    }, 2000);

    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar style={"auto"} />
        <View className="flex flex-col items-center justify-center flex-1">
          <FontAwesome5 name="tasks" size={120} color="blue" />
        </View>
      </SafeAreaView>
    );
}

export default WelcomeScreen;