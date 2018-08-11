import React from 'react';
import axios from 'axios';
import {View, Image, StatusBar, ToastAndroid, StyleSheet} from 'react-native';
import {clearLocalString, getLocalString} from "../realm/LocalString";
import {iniwisata_primary} from "../color";
import {DotIndicator} from 'react-native-indicators';
import {connect} from 'react-redux';
import {fetchDataUser} from "../redux/actions/user";

const TOKEN = getLocalString('token');

class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        this.cekLogin();
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
            const verifyToken = await axios.post('/iniwisata/token', {token: TOKEN});
            if (verifyToken) {
                await this.props.fetchDataUser(TOKEN);
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
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={iniwisata_primary}
                />
                <Image
                    source={require('../img/iniwisata-logo-white.png')}
                    style={{width: 150, height: 150}}
                />
                <View style={styles.loadingIndicator}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: iniwisata_primary
    },
    loadingIndicator: {
        width: 100,
        height: 100,
        marginTop: 20
    }
});

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    fetchDataUser:token => dispatch(fetchDataUser(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
