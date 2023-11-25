import { SafeAreaView, Image } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";

const WelcomeScreen = ({navigation}) => {
    const timer = setTimeout(() => {
        navigation.navigate('LoginScreen');
    }, 2000);

    return (
      <SafeAreaView className="items-center justify-center flex-1">
        <Image
          source={require("../../assets/icon.png")}
          style={{ width: 160, height: 160 }}
        />
      </SafeAreaView>
    );
}

export default WelcomeScreen;