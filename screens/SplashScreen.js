import React from 'react';
import axios from 'axios';
import {View, Image, StatusBar, ToastAndroid} from 'react-native';
import {clearLocalString, getLocalString} from "../realm/LocalString";
import {INIWISATA_MUDA} from "../color";
import {DotIndicator} from 'react-native-indicators';

class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        setTimeout(() => {
            this.cekLogin();
        }, 2000);
    }

    cekLogin() {
        if (getLocalString('token')) {
            this.cekSessionExp();
        } else {
            this.props.navigation.navigate('Auth');
        }
    }

    async cekSessionExp() {
        try {
            const token = getLocalString('token');
            const verifyToken = await axios.post('/iniwisata/token', {token});
            if (verifyToken) {
                this.props.navigation.navigate('AppDrawer');
            }
        } catch (e) {
            ToastAndroid.show('Sesi Login Telah Habis', ToastAndroid.SHORT);
            clearLocalString();
            this.props.navigation.navigate('Auth');
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: INIWISATA_MUDA
            }}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={INIWISATA_MUDA}
                />
                <Image
                    source={require('../img/iniwisata-logo-white.png')}
                    style={{
                        width: 150,
                        height: 150
                    }}
                />
                <View style={{width: 100, height: 100, marginTop: 20}}>
                    <DotIndicator
                        color="white"
                        size={10}
                        count={5}
                        animationDuration={1000}
                    />
                </View>
            </View>
        );
    }
}

export default SplashScreen;