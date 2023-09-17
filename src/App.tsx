import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';


import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from "./screens/WelcomeScreen";
import ProjectScreen from "./components/ProjectScreen";
import IssuesScreen from "./components/IssuesScreen";
import NotificationsScreen from "./components/NotificationsScreen";

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Project: ProjectScreen,
    Issues: IssuesScreen,
    Notifications: NotificationsScreen,
});
const StackNavigator = createStackNavigator({
    WelcomeScreen: {screen: WelcomeScreen},
    RegisterScreen: {screen: RegisterScreen},
    LoginScreen: {screen: LoginScreen},
    HomeScreen: {screen: HomeScreen},
}, {
    initialRouteName: "WelcomeScreen",
    defaultNavigationOptions: {headerShown: false},

})
export default createAppContainer(StackNavigator)
