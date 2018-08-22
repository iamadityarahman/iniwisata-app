import {REST_API_TOKEN} from "./keyToken";
import {AppRegistry, YellowBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import axios from 'axios';

YellowBox.ignoreWarnings(['Remote debugger']);

axios.defaults.baseURL = 'https://iniwisata.herokuapp.com/api';
// axios.defaults.baseURL = 'http://10.0.2.2:3030/api';
axios.defaults.headers = {
    token: REST_API_TOKEN
};

AppRegistry.registerComponent(appName, () => App);
