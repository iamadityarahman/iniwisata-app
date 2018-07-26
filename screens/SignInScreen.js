import React from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    Image,
    StatusBar
} from 'react-native';
import LoginForm from "../components/LoginForm";
import {INIWISATA_MUDA} from "../color";

export default class SignInScreen extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={INIWISATA_MUDA}
                />
                <View style={styles.loginContainer}>
                    <Image
                        resizeMode="contain"
                        style={styles.logo}
                        source={require('../img/iniwisata-text-white.png')}
                    />
                </View>
                <View style={styles.formContainer}>
                    <LoginForm
                        navigation={this.props.navigation}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF4A4A'
    },
    loginContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 100
    },
    formContainer: {
        margin: 20
    }
});
