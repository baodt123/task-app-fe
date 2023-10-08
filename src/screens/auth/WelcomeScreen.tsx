import {StatusBar} from 'expo-status-bar';
import {Image, SafeAreaView, Text, View} from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

// @ts-ignore
const WelcomeScreen = ({navigation}) => {
    const timer = setTimeout(() => {
        navigation.navigate('LoginScreen');
    }, 1000);

    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar style={"auto"} />
        <View className="flex flex-col items-center justify-center flex-1">
          <MaterialCommunityIcons name="penguin" size={120} color="blue" />
        </View>
      </SafeAreaView>
    );
}

export default WelcomeScreen;