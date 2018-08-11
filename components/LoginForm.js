import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ToastAndroid,
    Keyboard,
    Alert
} from 'react-native';
import axios from 'axios';
import {setLocalString} from "../realm/LocalString";
import {fetchDataUser} from "../redux/actions/user";
import {connect} from 'react-redux';
import {iniwisata_primary_dark} from "../color";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    componentDidMount() {
        this.emailInput.focus();
        this.emailInput.clear();
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
                Alert.alert(
                    'Form Kosong',
                    'Periksa kembali apakah email dan password sudah terisi',
                    [
                        {text: 'OK', onPress: () => {this.emailInput.focus()}}
                    ]
                );
            } else {
                await this.props.setIsLoading();
                await Keyboard.dismiss();
                const login = await axios.post('/iniwisata/login', {
                    email: this.state.email,
                    password: this.state.password
                });
                if (!setLocalString('token', login.data.token)) throw error();
                await this.props.fetchDataUser(login.data.token);
                await this.props.navigation.navigate('AppDrawer');
                ToastAndroid.show('Selamat datang di INIWISATA', ToastAndroid.SHORT);
            }
        } catch (e) {
            await this.props.setIsLoading();
            Alert.alert(
                'Login Gagal',
                'Periksa kembali apakah email dan password yang anda masukan sudah benar'
            );
        }
    }

    async _onRegisterPress() {
        try {
            if (this.state.email === '' || this.state.password === '') {
                Alert.alert(
                    'Form Kosong',
                    'Periksa kembali apakah email dan password sudah terisi',
                    [
                        {text: 'OK', onPress: () => {this.emailInput.focus()}}
                    ]
                );
            } else {
                await Keyboard.dismiss();
                await this.props.setIsLoading();
                const cekData = await axios.post('/iniwisata/daftar/cek', {email: this.state.email});
                if (cekData.data.tersedia) {
                    await this.props.setIsLoading();
                    this.props.navigation.navigate({
                        routeName: 'Registrasi',
                        params: {
                            email: this.state.email,
                            password: this.state.password
                        }
                    });
                } else {
                    Alert.alert(
                        'Daftar Gagal',
                        'Alamat email anda tidak dapat digunakan, ubah dengan email lain',
                        [
                            {text: 'OK', onPress: async () => {
                                await this.props.setIsLoading();
                            }}
                        ]
                    );
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        return (
            <View>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    ref={input => this.emailInput = input}
                    autoCorrect={false}
                    keyboardType="email-address"
                    returnKeyType="next"
                    placeholder="Masukan email anda"
                    placeholderTextColor="white"
                    onChangeText={this._emailInput.bind(this)}
                    blurOnSubmit={false}
                />
                <TextInput
                    style={styles.input}
                    returnKeyType="done"
                    ref={input => this.passwordInput = input}
                    placeholder="Masukan password anda"
                    placeholderTextColor="white"
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={this._passwordInput.bind(this)}
                />
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                        style={[styles.buttonContainer, {marginRight: 3}]}
                        onPress={this._onRegisterPress.bind(this)}
                    >
                        <Text style={styles.buttonText}>DAFTAR AKUN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.buttonContainer, {marginLeft: 3}]}
                        onPress={this._onLoginPress.bind(this)}
                    >
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        fontSize: 15,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: 'white'
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: iniwisata_primary_dark,
        paddingVertical: 15,
        marginBottom: 10
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});

const mapDispatchToProps = dispatch => ({
    fetchDataUser: token => dispatch(fetchDataUser(token))
});

export default connect(null, mapDispatchToProps)(LoginForm);
