import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

// @ts-ignore
const HomeScreen = ({navigation}) => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require("../assets/images/applogo.png")} style={{width: 150, height: 150}}/>
            <Text>Home page is coming soon!</Text>
        </View>
    );
};

export default HomeScreen;