import React from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    Image,
    StatusBar,
    Text
} from 'react-native';
import LoginForm from "../components/LoginForm";
import {iniwisata_primary} from "../color";
import {SkypeIndicator} from 'react-native-indicators';

class SignInScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }

    setIsLoading() {
        this.setState({isLoading: !this.state.isLoading});
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: iniwisata_primary
                }}>
                    <StatusBar
                        barStyle="light-content"
                        backgroundColor={iniwisata_primary}
                    />
                    <SkypeIndicator
                        color="white"
                        size={50}
                    />
                </View>
            );
        } else {
            return (
                <SafeAreaView style={styles.container}>
                    <StatusBar
                        barStyle="light-content"
                        backgroundColor={iniwisata_primary}
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
                            setIsLoading={this.setIsLoading.bind(this)}
                            navigation={this.props.navigation}
                        />
                    </View>
                </SafeAreaView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: iniwisata_primary
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

export default SignInScreen;
