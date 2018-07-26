/** @format */
import {AppRegistry, YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);

import App from './App';
import {name as appName} from './app.json';

import axios from 'axios';
import {REST_API_TOKEN} from "./key";
axios.defaults.baseURL = 'http://10.0.2.2:3030/api';
axios.defaults.headers = {
    token: REST_API_TOKEN
};

AppRegistry.registerComponent(appName, () => App);
