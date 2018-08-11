import React from 'react';
import {ThemeContext, getTheme} from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    createStackNavigator,
    createSwitchNavigator,
    createDrawerNavigator,
    NavigationActions,
    createBottomTabNavigator
} from 'react-navigation';
import SignInScreen from "./screens/SignInScreen";
import BerandaScreen from "./screens/BerandaScreen";
import ProfileScreen from "./screens/ProfileScreen";
import DrawerMenu from "./components/DrawerMenu";
import {Provider} from 'react-redux';
import store from './redux/store';
import {iniwisata_primary, iniwisata_primary_dark} from "./color";
import DetailScreen from "./screens/DetailScreen";
import MapsScreen from "./screens/MapsScreen";
import GaleriScreen from "./screens/GaleriScreen";
import SplashScreen from "./screens/SplashScreen";
import LogOutScreen from "./screens/LogOutScreen";
import RegistrasiScreen from "./screens/RegistrasiScreen";
import UlasanScreen from "./screens/UlasanScreen";
import TambahUlasanScreen from "./screens/TambahUlasanScreen";

export const detailBackAction = NavigationActions.back({
    key: 'listWisata'
});

const AuthStack = createStackNavigator(
    {
        SignIn: SignInScreen,
        Registrasi: RegistrasiScreen
    },
    {
        headerMode: 'none',
        initialRouteName: 'SignIn'
    }
);

const TabDetail = createBottomTabNavigator(
    {
        Detail: DetailScreen,
        Ulasan: UlasanScreen,
        Galeri: GaleriScreen,
        Maps: MapsScreen
    },
    {
        shifting: true,
        backBehavior: 'none',
        tabBarOptions: {
            activeTintColor: iniwisata_primary,
            inactiveTintColor: 'rgba(81, 77, 70, 0.7)',
            labelStyle: {
                fontWeight: 'bold'
            },
            tabStyle: {
                backgroundColor: 'white'
            }
        }
    }
);

const BerandaStack = createStackNavigator({
    Beranda: BerandaScreen,
    Detail: TabDetail,
    TambahUlasan: TambahUlasanScreen
},{
    initialRouteName: 'Beranda',
    headerMode: 'none'
});

const ProfileStack = createStackNavigator({
    Profile: ProfileScreen
},{
    initialRouteName: 'Profile',
    headerMode: 'none'
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
        headerMode: 'none',
        contentComponent: DrawerMenu,
        contentOptions: {
            activeTintColor: iniwisata_primary_dark,
            inactiveTintColor: 'black'
        },
        initialRouteName: 'Beranda'
    }
);

const PrimaryStack = createSwitchNavigator(
    {
        Splash: SplashScreen,
        Auth: AuthStack,
        AppDrawer: AppDrawer
    },
    {
        initialRouteName: 'Splash',
    }
);

const uiTheme = {
    toolbar: {
        container: {
            backgroundColor: iniwisata_primary
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
