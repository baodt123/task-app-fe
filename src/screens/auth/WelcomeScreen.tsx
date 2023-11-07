import {SafeAreaView} from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";

const WelcomeScreen = ({navigation}) => {
    const timer = setTimeout(() => {
        navigation.navigate('LoginScreen');
    }, 2000);

    return (
      <SafeAreaView className="items-center justify-center flex-1">
        <FontAwesome5 name="tasks" size={120} color="blue" />
      </SafeAreaView>
    );
}

export default WelcomeScreen;