import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import ProjectScreen from "../components/ProjectScreen";
import IssuesScreen from "../components/IssuesScreen";
import NotificationsScreen from "../components/NotificationsScreen";
import HomeScreen from '../screens/HomeScreen';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};
const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {backgroundColor: '#AD40AF'},
                tabBarInactiveTintColor: '#fff',
                tabBarActiveTintColor: 'yellow',
            }}>
            <Tab.Screen name="Project" component={ProjectScreen}/>
            <Tab.Screen name="Issues" component={IssuesScreen}/>
            <Tab.Screen name="Notifications" component={NotificationsScreen}/>
        </Tab.Navigator>
    );
};
export default TabNavigator;