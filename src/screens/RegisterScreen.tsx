import {StatusBar} from 'expo-status-bar';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from "react";
import {registerApi} from "../services/authentication";

// @ts-ignore
const RegisterScreen = ({navigation}) => {
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [rePassword, setRePassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState(false)
    const validateEmail = (valueToValidate: string) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(valueToValidate);
    }
    const register = async () => {
        if (email === "") {
            return alert("Empty email!");
        }
        if (username === "") {
            return alert("Empty username!");
        }
        if (password === "") {
            return alert("Empty password!");
        }
        if (password.length < 8) {
            return alert("Length of password must bigger than 8!")
        }
        // Validate email
        if (!validateEmail(email)) {
            return alert("Email invalid!");
        }
        try {
            const registerResponse = await registerApi({
                email,
                username,
                password,
            })
            const {data} = registerResponse
            console.log('Result', registerResponse.data);
            navigation.navigate('LoginScreen')
        } catch (err) {
            alert(err);
        }
        if (password !== rePassword) {
            return alert("Error password!");
        }
    };
    return (
        <View className="flex-1 items-center justify-center bg-slate-50">
            <StatusBar style="auto"/>
            <View className="p-8 w-full max-w-sm">
                <Text className="text-4xl font-bold mb-6 text-slate-900">Register</Text>
                <TextInput className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
                           placeholderTextColor="#000"
                           placeholder="Enter email"
                           value={email}
                           onChangeText={(value) => {
                               setEmail(value)
                           }}/>
                <TextInput className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
                           placeholderTextColor="#000"
                           placeholder="Enter username"
                           value={username}
                           onChangeText={(value) => {
                               setUsername(value)
                           }}/>
                <TextInput className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
                           placeholderTextColor="#000"
                           placeholder="Enter password"
                           value={password}
                           secureTextEntry={!showPassword}
                           onChangeText={(value) => {
                               setPassword(value)
                           }}/>
                <TextInput className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
                           placeholderTextColor="#000"
                           placeholder="Re-enter password"
                           value={rePassword}
                           secureTextEntry={!showPassword}
                           onChangeText={(value) => {
                               setRePassword(value)
                           }}/>
                <TouchableOpacity
                    className="h-12 bg-cyan-500 rounded-md flex flex-row justify-center items-center px-6">
                    <View className="flex-1 flex items-center">
                        <Text className="text-white text-base font-medium" onPress={register}>Register</Text>
                    </View>
                </TouchableOpacity>
                <View className="flex-row justify-center mt-7">
                    <Text className="text-gray-500 font-semibold">
                        Already Have An Account?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                        <Text className="font-semibold text-cyan-500"> Login Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default RegisterScreen;