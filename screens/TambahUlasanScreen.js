import React from 'react';
import {View, Text, Image, ScrollView, ToastAndroid, StyleSheet, Keyboard} from 'react-native';
import axios from 'axios';
import {Toolbar} from "react-native-material-ui";
import StarRating from 'react-native-star-rating';
import {iniwisata_star_active} from "../color";
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import {connect} from 'react-redux';
import {fetchCommentAble, fetchRating, fetchUlasan} from "../redux/actions/wisataOpen";
import {ProgressDialog} from 'react-native-simple-dialogs';

class TambahUlasanScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: this.props.navigation.state.params.rating,
            ulasan: '',
            onProgress: false
        };

        this._kirimUlasan = this._kirimUlasan.bind(this);
    }

    componentDidMount() {
        this.ulasanInput.focus();
    }

    _kirimUlasan() {
        const {user, detailWisata} = this.props;

        const data = {
            user_id: user.id,
            wisata_id: detailWisata.id,
            rating: this.state.rating,
            ulasan: this.state.ulasan,
            type: 'akun'
        };

        if (this.state.ulasan == '') {
            ToastAndroid.show('Ulasan wajib diisi', ToastAndroid.SHORT);
        } else {
            axios.post('/iniwisata/ulasan/tambah', {...data}).then(async res => {
                if (res.data.affectedRows > 0) {
                    await this.setState({onProgress: true});
                    await Keyboard.dismiss();
                    await this.props.fetchRating(detailWisata.id);
                    await this.props.fetchUlasan(detailWisata.id);
                    await this.props.fetchCommentAble(detailWisata.id, user.id);
                    await this.setState({onProgress: false});
                    this.props.navigation.navigate('Ulasan');
                }
            });
        }
    }

    render() {
        const {detailWisata, user} = this.props;

        return (
            <View style={styles.container}>
                <ProgressDialog
                    visible={this.state.onProgress}
                    message="Mengirim ulasan..."
                />
                <Toolbar
                    leftElement="arrow-back"
                    rightElement="send"
                    centerElement={<CenterElement {...detailWisata} />}
                    onLeftElementPress={() => {this.props.navigation.goBack()}}
                    onRightElementPress={() => {this._kirimUlasan()}}
                />
                <View style={styles.profileContainer}>
                    <Image source={{uri: user.img}} style={styles.profileImage}/>
                    <View style={{marginHorizontal: 10}}>
                        <Text style={styles.profileNamaText}>{user.nama}</Text>
                        <Text>{user.email}</Text>
                    </View>
                </View>

                <View style={{marginHorizontal: 20}}>
                    <StarRating
                        rating={this.state.rating}
                        fullStarColor={iniwisata_star_active}
                        selectedStar={rating => this.setState({rating})}
                    />
                </View>
                <ScrollView style={styles.textInputContainer}>
                    <AutoGrowingTextInput
                        ref={input => this.ulasanInput = input}
                        autoCorrect={false}
                        onChangeText={ulasan => this.setState({ulasan})}
                        style={styles.ulasanTextInput}
                        value={this.state.ulasan}
                        placeholder="Masukan pendapat anda mengenai tempat wisata ini"
                    />
                </ScrollView>
            </View>
        );
    }
}

const CenterElement = (props) => (
    <View>
        <Text style={styles.toolbarTitle}>Tambah Ulasan</Text>
        <Text numberOfLines={1} style={styles.toolbarSubtitle}>
            {`${props.nama_tempat}, ${props.alamat}`}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    toolbarTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    toolbarSubtitle: {
        width: 250,
        color: 'white'
    },
    ulasanTextInput: {
        borderRadius: 0,
        paddingHorizontal: 20
    },
    textInputContainer: {
        borderTopWidth: 0.5,
        marginTop: 15,
        borderColor: 'grey'
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 10
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    profileNamaText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16
    }
});

const mapStateToProps = state => ({
    detailWisata: state.wisataOpen.detailWisata,
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    fetchRating: id_wisata => dispatch(fetchRating(id_wisata)),
    fetchUlasan: id_wisata => dispatch(fetchUlasan(id_wisata)),
    fetchCommentAble: (id_wisata, id_user) => dispatch(fetchCommentAble(id_wisata, id_user))
});

export default connect(mapStateToProps, mapDispatchToProps)(TambahUlasanScreen);
