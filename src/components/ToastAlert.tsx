import Toast from "react-native-toast-message";

export const ToastAlert = (type, text1, text2) => {
  Toast.show({
    type,
    text1,
    text2,
    visibilityTime: 1500,
  });
};
