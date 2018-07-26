import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ToastAndroid
} from 'react-native';
import axios from 'axios';
import {setLocalString} from "../realm/LocalString";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    _emailInput(value) {
        this.setState({email: value});
    }

    _passwordInput(value) {
        this.setState({password: value});
    }

    async _onLoginPress() {
        try {
            if (this.state.email === "" || this.state.password === "") {
                ToastAndroid.show('Email atau Password Kosong', ToastAndroid.SHORT);
            } else {
                const login = await axios.post('/iniwisata/login', {
                    email: this.state.email,
                    password: this.state.password
                });
                if (!setLocalString('token', login.data.token)) throw error;
                this.props.navigation.navigate('AppDrawer');
            }
        } catch (e) {
            ToastAndroid.show('Email atau Password salah!', ToastAndroid.SHORT);
        }
    }

    render() {
        return (
            <View>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    autoCorrect={false}
                    keyboardType="email-address"
                    returnKeyType="next"
                    placeholder="Masukan email anda"
                    placeholderTextColor="white"
                    onChangeText={this._emailInput.bind(this)}
                />
                <TextInput
                    style={styles.input}
                    returnKeyType="go"
                    ref={input => this.passwordInput = input}
                    placeholder="Masukan password anda"
                    placeholderTextColor="white"
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={this._passwordInput.bind(this)}
                />
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={this._onLoginPress.bind(this)}
                >
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        height: 50,
        fontSize: 15,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: 'white'
    },
    buttonContainer: {
        backgroundColor: '#E7343F',
        paddingVertical: 15
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});

export default LoginForm;
