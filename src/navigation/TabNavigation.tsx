import React, {useEffect, useState} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import ProjectScreen from "../screens/project/ProjectScreen";
import TaskScreen from "../screens/task/TaskScreen";
import NotificationScreen from "../screens/NotificationScreen";
import {FontAwesome5} from "@expo/vector-icons";
import {getExpoToken, getMessage} from "../services/user";
import {sendPushNotification} from "../services/notify";

const Tab = createBottomTabNavigator();

const TabNavigator = ({navigation}) => {
    const [lastMess, setLastMess] = useState("");

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", async () => {
            getMessage()
                .then(async (response) => {
                    const newMess = response.data[response.data.length - 1];
                    if (newMess !== lastMess) {
                        await sendPushNotification(response.data.reverse()[0], await getExpoToken());
                    }
                    setLastMess(newMess);
                })
                .catch((error) => {
                });
        });

        return () => unsubscribe();
    }, [navigation, lastMess]);
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "blue",
                tabBarShowLabel: false,
            }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <FontAwesome5
                            name="clock"
                            size={20}
                            color={focused ? "blue" : "gray"}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Project"
                component={ProjectScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <FontAwesome5
                            name="folder"
                            size={20}
                            color={focused ? "blue" : "gray"}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Task"
                component={TaskScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <FontAwesome5
                            name="tasks"
                            size={20}
                            color={focused ? "blue" : "gray"}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Notification"
                component={NotificationScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <FontAwesome5
                            name="bell"
                            size={20}
                            color={focused ? "blue" : "gray"}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
