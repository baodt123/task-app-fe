import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./navigation/AuthStack";
import "react-native-gesture-handler";
import DrawerStack from "./navigation/DrawerStack";
import Toast, {
  ErrorToast,
  SuccessToast,
} from "react-native-toast-message";

const toastConfig = {
  success: (props) => (
    <SuccessToast
      style={{ marginLeft: -3, borderLeftColor: "blue" }}
      {...props}
      text1Style={{
        fontSize: 20,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      style={{ marginLeft: -3, borderLeftColor: "red" }}
      {...props}
      text1Style={{
        fontSize: 20,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
      <NavigationContainer>
        {isLoggedIn ? <DrawerStack /> : <AuthStack />}
        <Toast config={toastConfig} />
      </NavigationContainer>
  );
}

export default App;
