import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthStack from './navigation/AuthStack';
// import AppStack from './navigation/AppStack';

function App() {
    return (
        <NavigationContainer>
            {/* <AppStack /> */}
            <AuthStack />
        </NavigationContainer>
    );
}

export default App;