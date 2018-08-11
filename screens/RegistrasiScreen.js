import React from 'react';
import {
    Text,
    View,
    StatusBar,
    Image,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Alert, ToastAndroid
} from 'react-native';
import {iniwisata_primary, iniwisata_primary_dark} from "../color";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import ImagePicker from "react-native-image-crop-picker";
import {setLocalString} from "../realm/LocalString";
import {connect} from 'react-redux';
import {fetchDataUser} from "../redux/actions/user";
import {WaveIndicator} from 'react-native-indicators';

class RegistrasiScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.navigation.state.params.email,
            password: this.props.navigation.state.params.password,
            nama: '',
            photoProfile: null
        }
    }

    componentDidMount() {
        this.namaInput.focus();
    }

    async componentWillMount() {
        try {
            const response = await axios.get('/iniwisata/profile_default');
            this.setState({photoProfile: response.data.base64});
        } catch (e) {
            console.error(e);
        }
    }

    async _login() {
        try {
            const login = await axios.post('/iniwisata/login', {
                email: this.state.email,
                password: this.state.password
            });
            this.props.fetchDataUser(login.data.token);
            if (!setLocalString('token', login.data.token)) throw error;
            this.props.navigation.navigate('AppDrawer');
            ToastAndroid.show('Selamat datang di INIWISATA', ToastAndroid.SHORT);
        } catch (e) {
            ToastAndroid.show('Login gagal', ToastAndroid.SHORT);
        }
    }

    async _handleDaftar() {
        try {
            if (this.state.nama !== '') {
                const response = await axios.post('/iniwisata/daftar', {...this.state});
                if (response.data.status) {
                    Alert.alert(
                        'Sukses',
                        'Pendaftaran akun berhasil dilakukan',
                        [
                            {text: 'OK', onPress: () => {this._login()}}
                        ]
                    );
                } else {
                    throw error();
                }
            } else {
                throw error();
            }
        } catch (e) {
            ToastAndroid.show('Pendaftaran gagal, harap isi field', ToastAndroid.SHORT);
        }
    }

    _changePhoto() {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true,
            includeBase64: true
        }).then(image => {
            const photoProfile = `data:${image.mime};base64,${image.data}`;
            this.setState({photoProfile});
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="white"
                />
                <View style={styles.formContainer}>
                    <View style={{flexDirection: 'row', marginBottom: 10}}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={this._changePhoto.bind(this)}
                        >
                            {
                                this.state.photoProfile ? (
                                    <Image
                                        source={{uri: this.state.photoProfile}}
                                        style={styles.photoProfile}
                                    />
                                ) : (
                                    <View style={{
                                        height: 120,
                                        width: 120,
                                    }}>
                                        <WaveIndicator
                                            color={iniwisata_primary}
                                            size={80}
                                        />
                                    </View>
                                )
                            }
                        </TouchableOpacity>
                        <View style={styles.textDescription}>
                            <Text>
                                Masukan nama lengkap anda dan pilih sembarang photo sebagai photo profile anda dengan menekan gambar disamping.
                            </Text>
                        </View>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Nama lengkap"
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        returnKeyType="next"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        blurOnSubmit={false}
                        onChangeText={nama => this.setState({nama})}
                        ref={input => this.namaInput = input}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, {marginRight: 3}]}
                        activeOpacity={0.8}
                        onPress={() => {this.props.navigation.navigate('SignIn')}}
                    >
                        <Icon name="md-arrow-round-back" color="white" size={18}/>
                        <Text style={styles.buttonText}>KEMBALI</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, {marginLeft: 3}]}
                        activeOpacity={0.8}
                        onPress={this._handleDaftar.bind(this)}
                    >
                        <Text style={styles.buttonText}>DAFTAR</Text>
                        <Icon name="md-send" color="white" size={18}/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    formContainer: {
        flexGrow: 1,
        margin: 20
    },
    input: {
        height: 50,
        fontSize: 15,
        backgroundColor: 'rgba(225,225,225,0.6)',
        marginBottom: 10,
        padding: 10,
        color: 'rgba(0, 0, 0, 0.8)'
    },
    buttonContainer: {
        flexDirection: 'row',
        margin: 20
    },
    button: {
        flex: 1,
        backgroundColor: iniwisata_primary_dark,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        activeOpacity: 0.8
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginHorizontal: 10
    },
    textDescription: {
        width: 0,
        flexGrow: 1,
        marginLeft: 10
    },
    photoProfile: {
        width: 120,
        height: 120
    }
};

const mapDispatchToProps = dispatch => ({
    fetchDataUser: token => dispatch(fetchDataUser(token))
});

export default connect(null, mapDispatchToProps)(RegistrasiScreen);
