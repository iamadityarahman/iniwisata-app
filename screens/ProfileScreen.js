import React from 'react';
import {View, TextInput, StyleSheet, ScrollView, Alert, Dimensions} from 'react-native';
import {iniwisata_primary_dark} from "../color";
import {Button, Text} from 'native-base';
import axios from 'axios';
import {connect} from 'react-redux';
import ProfileImage from "../components/ProfileImage";
import {Toolbar} from "react-native-material-ui";
import {getLocalString} from "../realm/LocalString";
import {fetchDataUser} from "../redux/actions/user";

class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nama: '',
            email: '',
            passwordLama: '',
            passwordBaru: ''
        };
    }

    _kirimPerubahanData() {
        const {user} = this.props;
        const newData = {
            id: this.props.user.id,
            nama: this.state.nama === '' ? user.nama : this.state.nama,
            email: this.state.email === '' ? user.email : this.state.email,
            password: this.state.passwordLama
        };

        axios.post('/iniwisata/user/profile/update/data', {...newData}).then(res => {
            const {data} = res;
            if (data.affectedRows > 0) {
                this.props.fetchDataUser();
                alert('Data berhasil diperbarui');
                this.refPasswordLama.clear();
                this.setState({passwordLama: ''});
            } else {
                Alert.alert(
                    'Password salah',
                    'Password yang anda masukan salah',
                    [
                        {text: 'Keluar', onPress: () => {this.refPasswordLama.focus()}}
                    ]
                );
            }
        });
    }

    _gantiPassword() {
        const newPassword = {
            id: this.props.user.id,
            password_lama: this.state.passwordLama,
            password_baru: this.state.passwordBaru
        };

        axios.post('/iniwisata/user/update/password', {...newPassword}).then(res => {
            const {data} = res;
            if (data.changedRows > 0) {
                alert('Password berhasil diperbarui');
                this.props.navigation.navigate('Logout');
            } else {
                Alert.alert(
                    'Password salah',
                    'Password yang anda masukan salah atau password sama',
                    [
                        {text: 'Keluar', onPress: () => {this.refPasswordLama.focus()}}
                    ]
                );
            }
        });
    }

    _simpanPerubahanData() {
        if (this.state.passwordLama === '') {
            Alert.alert(
                'Password Kosong',
                'Password harus diisi untuk menyimpan perubahan',
                [
                    {text: 'Keluar', onPress: () => {this.refPasswordLama.focus()}}
                ]
            );
        } else if (this.state.passwordLama !== '' && this.state.passwordBaru !== '') {
            Alert.alert(
                'Ganti Password',
                'Anda akan merubah password login saat ini dan akan logout dari aplikasi',
                [
                    {text: 'OK', onPress: () => {
                        this._gantiPassword();
                    }},
                    {text: 'Batal', onPress: () => console.log('Batal ganti password')}
                ]
            );
        } else {
            Alert.alert(
                'Perbarui Informasi',
                'Anda akan mengubah beberapa informasi akun pengguna anda',
                [
                    {text: 'OK', onPress: () => {
                        this._kirimPerubahanData();
                    }},
                    {text: 'Batal', onPress: () => console.log('Batal ubah data')}
                ]
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Toolbar
                    leftElement="menu"
                    centerElement="PROFILE"
                    onLeftElementPress={() => {this.props.navigation.openDrawer()}}
                />
                <ScrollView>
                    <View style={styles.innerContainer}>
                        <ProfileImage/>
                        <View style={styles.formContainer}>
                            <View style={styles.textInputContainer}>
                                <Text style={styles.headText}>Nama</Text>
                                <TextInput
                                    style={styles.textInput}
                                    defaultValue={this.props.user.nama}
                                    onChangeText={nama => this.setState({nama})}
                                />
                            </View>

                            <View style={styles.textInputContainer}>
                                <Text style={styles.headText}>Email</Text>
                                <TextInput
                                    style={styles.textInput}
                                    defaultValue={this.props.user.email}
                                    onChangeText={email => this.setState({email})}
                                />
                            </View>

                            <View style={styles.textInputContainer}>
                                <Text style={styles.headText}>Password Lama</Text>
                                <TextInput
                                    style={styles.textInput}
                                    value={this.state.passwordLama}
                                    secureTextEntry
                                    onChangeText={passwordLama => this.setState({passwordLama})}
                                    placeholder="Masukan password untuk menyimpan"
                                    ref={input => this.refPasswordLama = input}
                                />
                            </View>

                            <View style={styles.textInputContainer}>
                                <Text style={styles.headText}>Password Baru</Text>
                                <TextInput
                                    style={styles.textInput}
                                    value={this.state.passwordBaru}
                                    secureTextEntry
                                    placeholder="Isi untuk merubah password"
                                    onChangeText={passwordBaru => this.setState({passwordBaru})}
                                />
                            </View>

                            <Button
                                block
                                style={styles.buttonStyle}
                                onPress={this._simpanPerubahanData.bind(this)}
                            >
                                <Text>Simpan Perubahan</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    innerContainer: {
        alignItems: 'center',
        padding: 20
    },
    buttonStyle: {
        marginTop: 20,
        backgroundColor: iniwisata_primary_dark,
    },
    formContainer: {
        paddingHorizontal: 20,
        width
    },
    textInputContainer: {
        marginVertical: 10
    },
    headText: {
        fontSize: 12,
        color: iniwisata_primary_dark,
        fontWeight: 'bold'
    },
    textInput: {
        fontSize: 16,
        borderBottomWidth: 1,
        paddingVertical: 10,
        borderBottomColor: iniwisata_primary_dark
    }
});

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    fetchDataUser: () => dispatch(fetchDataUser(getLocalString('token')))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
