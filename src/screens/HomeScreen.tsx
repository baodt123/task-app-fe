import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home page is coming soon!</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Project')}>
                <Text>Go to Project</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Issues')}>
                <Text>Go to Issues</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                <Text>Go to Notifications</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;