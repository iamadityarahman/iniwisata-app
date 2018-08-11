import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import StarRating from "react-native-star-rating";
import Icon from 'react-native-vector-icons/Ionicons';
import showPopupMenu from 'react-native-popup-menu-android';
import axios from 'axios';
import {fetchRating, fetchUlasan, fetchCommentAble} from "../redux/actions/wisataOpen";
import connect from "react-redux/es/connect/connect";
import {BallIndicator} from 'react-native-indicators';
import {ProgressDialog} from 'react-native-simple-dialogs';

const Rating = props => (
    <View style={{width: 60}}>
        <StarRating
            disabled={true}
            rating={props.rating}
            starSize={12}
            fullStarColor="orange"
            emptyStar="star"
            emptyStarColor="grey"
        />
    </View>
);

class UlasanList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photoProfile: null,
            onProgressHapus: false
        };
    }

    async componentWillMount() {
        try {
            const namaFoto = this.props.img;
            const {data} = await axios.get(`/iniwisata/user/thumbnail/${namaFoto}`);
            this.setState({photoProfile: data});
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const {user} = this.props;
        return (
            <View style={styles.container}>
                <ProgressDialog
                    visible={this.state.onProgressHapus}
                    message="Menghapus ulasan..."
                />
                <View>
                    {
                        this.state.photoProfile ? (
                            <Image
                                source={{uri: this.state.photoProfile}}
                                style={styles.photoProfile}
                            />
                        ) : (
                            <View style={{
                                height: 50,
                                width: 50,
                                borderRadius: 25,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <BallIndicator
                                    color="#e9e9e9"
                                    size={30}
                                />
                            </View>
                        )
                    }

                </View>
                <View style={styles.ulasanContainer}>
                    <Text style={{fontSize: 16}}>
                        {this.props.nama}
                    </Text>
                    <Rating rating={this.props.rating}/>
                    <Text style={{fontSize: 13}}>
                        {this.props.ulasan}
                    </Text>
                </View>
                {
                    user.id === this.props.id_user ? (
                        <View>
                            <TouchableOpacity
                                onPress={this.showMore}
                                ref={input => this.moreButton = input}
                            >
                                <Icon name="md-more" size={20}/>
                            </TouchableOpacity>
                        </View>
                    ) : null
                }
            </View>
        );
    }

    showMore = () => {
        showPopupMenu(
            [
                { id:'hapus', label:'Hapus' }
            ],
            this.handleMoreItemSelect,
            this.moreButton
        );
    };

    updateData(kondisi) {
        const {user, detailWisata} = this.props;
        this.setState({onProgressHapus: true});
        if (kondisi) {
            this.props.fetchRating(detailWisata.id);
            this.props.fetchUlasan(detailWisata.id);
            this.props.fetchCommentAble(detailWisata.id, user.id);
        } else {
            console.log('Tidak dihapus');
        }
        this.setState({onProgressHapus: false});
    }

    handleMoreItemSelect = (item) => {
        if (item.id == 'hapus') {
            const id = this.props.id;
            axios.post('/iniwisata/ulasan/hapus', {id}).then(res => {
                this.updateData(res.data);
            });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        margin: 10
    },
    photoProfile: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    ulasanContainer: {
        flexGrow: 1,
        width: 0,
        marginLeft: 7
    }
});

const mapStateToProps = state => ({
    user: state.user,
    detailWisata: state.wisataOpen.detailWisata
});

const mapDispatchToProps = dispatch => ({
    fetchRating: id_wisata => dispatch(fetchRating(id_wisata)),
    fetchUlasan: id_wisata => dispatch(fetchUlasan(id_wisata)),
    fetchCommentAble: (id_wisata, id_user) => dispatch(fetchCommentAble(id_wisata, id_user))
});

export default connect(mapStateToProps, mapDispatchToProps)(UlasanList);
