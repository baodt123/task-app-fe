import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProjectScreen from './../components/ProjectScreen';
import IssuesScreen from './../components/IssuesScreen';
import NotificationsScreen from '../components/NotificationsScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Project" component={ProjectScreen} />
            <Stack.Screen name="Issues" component={IssuesScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
        </Stack.Navigator>
    );
}

export default HomeStack;