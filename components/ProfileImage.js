import React from "react";
import {Image, Text, TouchableOpacity, View, StyleSheet, ToastAndroid} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {iniwisata_primary_dark} from "../color";
import ImagePicker from "react-native-image-crop-picker";
import {connect} from 'react-redux';
import axios from 'axios';
import {getLocalString} from "../realm/LocalString";
import {fetchDataUser} from "../redux/actions/user";
import {ProgressDialog} from 'react-native-simple-dialogs';

const TOKEN = getLocalString('token');

class ProfileImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            saveDialog: false
        }
    }

    updateImage() {
        const {user} = this.props;
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true,
            includeBase64: true
        }).then(async image => {
            if (image) {
                await this.setState({saveDialog: true});
                axios.post('/iniwisata/user/profile/update/pic', {namafoto: user.namafoto, data: image.data}).then(async res => {
                    const {data} = res;
                    if (data) {
                        await this.props.fetchDataUser(TOKEN);
                        await this.setState({saveDialog: false});
                        ToastAndroid.show('Photo diperbarui', ToastAndroid.SHORT);
                    } else {
                        ToastAndroid.show('Photo gagal diperbarui', ToastAndroid.SHORT);
                    }
                });
            } else {
                throw error();
            }
        }).catch((e) => {
            ToastAndroid.show('Terdapat kesalahan', ToastAndroid.SHORT);
        });
    }

    render() {
        const {user} = this.props;
        return (
            <View style={{alignItems: 'center'}}>
                <ProgressDialog
                    visible={this.state.saveDialog}
                    message="Menyimpan perubahan..."
                />
                <Image
                    source={{uri: user.img}}
                    style={styles.imagePofile}
                />
                <TouchableOpacity
                    onPress={this.updateImage.bind(this)}
                >
                    <Text style={styles.updateProfileButtonText} >
                        Ubah&nbsp;&nbsp;<Icon name="md-create"/>
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imagePofile: {
        height: 150,
        width: 150,
        borderRadius: 75
    },
    updateProfileButtonText: {
        margin: 7,
        color: iniwisata_primary_dark,
        fontSize: 12
    }
});

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    fetchDataUser: token => dispatch(fetchDataUser(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileImage);
