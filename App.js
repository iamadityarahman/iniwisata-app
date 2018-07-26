import React from 'react';
import {ThemeContext, getTheme} from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    createStackNavigator,
    createSwitchNavigator,
    createDrawerNavigator,
    NavigationActions
} from 'react-navigation';
import SignInScreen from "./screens/SignInScreen";
import BerandaScreen from "./screens/BerandaScreen";
import ProfileScreen from "./screens/ProfileScreen";
import DrawerMenu from "./components/DrawerMenu";
import {Provider} from 'react-redux';
import store from './redux/store';
import {INIWISATA_MUDA, INIWISATA_TUA} from "./color";
import DetailScreen from "./screens/DetailScreen";
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import MapsScreen from "./screens/MapsScreen";
import GaleriScreen from "./screens/GaleriScreen";
import SplashScreen from "./screens/SplashScreen";
import LogOutScreen from "./screens/LogOutScreen";

export const detailBackAction = NavigationActions.back({
    key: 'listWisata'
});

const AuthStack = createStackNavigator(
    {
        SignIn: SignInScreen
    },
    {
        headerMode: 'none'
    }
);

const TabDetail = createMaterialBottomTabNavigator(
    {
        Detail: DetailScreen,
        Galeri: GaleriScreen,
        Maps: MapsScreen
    },
    {
        shifting: true,
        backBehavior: 'none',
        barStyle: {
            backgroundColor: '#ff2725'
        }
    }
);

const BerandaStack = createStackNavigator({
    Beranda: BerandaScreen,
    Detail: TabDetail
},{
    headerMode: 'none'
});

const ProfileStack = createStackNavigator({
    Profile: ProfileScreen
});

const AppDrawer = createDrawerNavigator(
    {
        Beranda: {
            screen: BerandaStack,
            navigationOptions: {
                drawerLabel: 'Beranda',
                drawerIcon: ({tintColor}) => (
                    <Icon name="md-home" size={30} color={tintColor} />
                )
            }
        },
        Profile: {
            screen: ProfileStack,
            navigationOptions: {
                drawerLabel: 'Profile',
                drawerIcon: ({tintColor}) => (
                    <Icon name="md-person" size={30} color={tintColor}/>
                )
            }
        },
        Logout: {
            screen: LogOutScreen,
            navigationOptions: {
                drawerLabel: 'Log Out',
                drawerIcon: ({tintColor}) => (
                    <Icon name="md-log-out" size={30} color={tintColor}/>
                )
            }
        }
    },
    {
        contentComponent: DrawerMenu,
        contentOptions: {
            activeTintColor: INIWISATA_TUA,
            inactiveTintColor: 'black'
        },
        initialRouteName: 'Profile'
    }
);

const PrimaryStack = createSwitchNavigator(
    {
        Splash: SplashScreen,
        Auth: AuthStack,
        AppDrawer: AppDrawer
    },
    {
        initialRouteName: 'AppDrawer',
    }
);

const uiTheme = {
    toolbar: {
        container: {
            backgroundColor: INIWISATA_MUDA
        }
    }
};

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ThemeContext.Provider value={getTheme(uiTheme)}>
                    <PrimaryStack/>
                </ThemeContext.Provider>
            </Provider>
        );
    }
}
