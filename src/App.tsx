import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./navigation/AuthStack";
import "react-native-gesture-handler";
import DrawerStack from "./navigation/DrawerStack";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <NavigationContainer>
      {isLoggedIn ? <DrawerStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default App;
