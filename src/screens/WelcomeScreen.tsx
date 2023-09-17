import {StatusBar} from 'expo-status-bar';
import {Image, SafeAreaView, Text, View} from 'react-native';
import React from "react";

// @ts-ignore
const WelcomeScreen = ({navigation}) => {
    const timer = setTimeout(() => {
        navigation.navigate('LoginScreen');
    }, 2500);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar style={"auto"}/>
            <View className="flex-1 flex flex-col justify-center items-center">
                <Image source={require("../assets/images/applogo.png")} style={{width: 150, height: 150}}/>
            </View>
        </SafeAreaView>
    )
}

export default WelcomeScreen;