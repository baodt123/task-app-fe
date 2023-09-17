import {StatusBar} from 'expo-status-bar';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from "react";
import * as SecureStore from 'expo-secure-store'
import {loginApi} from "../services/authentication";

// @ts-ignore
const LoginScreen = ({navigation}) => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState(false)
    const login = async () => {
        try {
            const {data} = await loginApi({
                username,
                password
            });
            alert("Login Success!");
            navigation.navigate("HomeScreen");
        } catch (err) {
            // @ts-ignore
            alert(err.message);
        }
    };

    useEffect(() => {
        const checkTokenAndNavigate = async () => {
            const jwtToken = await SecureStore.getItemAsync('jwtToken');
            if (jwtToken) {
                navigation.navigate("HomeScreen");
            }
        };
        checkTokenAndNavigate()
    }, []);

    const handleLoginWithGoogle = () => {
        // Add your logic for handling Google login here
        // This can involve redirecting to a Google OAuth flow or using a library for Google login.
        alert("Login with Google clicked.");
    };

    return (
        <View className="flex-1 items-center justify-center bg-slate-50">
            <StatusBar style="auto"/>
            <View className="p-8 w-full max-w-sm">
                <Text className="text-4xl font-bold mb-6 text-slate-900">Login</Text>
                <TextInput className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
                           placeholderTextColor="#000"
                           placeholder="Enter username"
                           value={username}
                           onChangeText={(value) => {
                               setUsername(value)
                           }}/>
                <TextInput className="w-full bg-white border border-slate-200 rounded-md h-12 px-4"
                           placeholderTextColor="#000"
                           placeholder="Enter password"
                           value={password}
                           secureTextEntry={!showPassword}
                           onChangeText={(value) => {
                               setPassword(value)
                           }}/>
                <View className="flex flex-row justify-between items-center my-8">
                    <View className="flex-row items-center">
                        <TouchableOpacity
                            className="bg-white border border-slate-200 h-6 w-6 rounded-sm mr-2 flex items-center justify-center">
                            <View className="bg-cyan-400 w-4 h-4 rounded-sm"/>
                        </TouchableOpacity>
                        <Text className="text-slate-900">Remember Me</Text>
                    </View>
                    <TouchableOpacity>
                        <Text className="text-cyan-400 font-bold">Forgot Password</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={login}
                                  className="h-12 bg-cyan-500 rounded-md flex flex-row justify-center items-center px-6">
                    <View className="flex-1 flex items-center">
                        <Text className="text-white text-base font-medium">Login</Text>
                    </View>
                </TouchableOpacity>
                <Text className="text-center my-4 text-gray-500">Or</Text>
                <TouchableOpacity onPress={handleLoginWithGoogle}
                                  className="h-12 bg-red-500 rounded-md flex flex-row justify-center items-center px-6">
                    <View className="flex-1 flex items-center">
                        <Text className="text-white text-base font-medium">Login with Google</Text>
                    </View>
                </TouchableOpacity>
                <View className="flex-row justify-center mt-7">
                    <Text className="text-gray-500 font-semibold">
                        Don't Have An Account?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                        <Text className="font-semibold text-cyan-500"> Register Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default LoginScreen;