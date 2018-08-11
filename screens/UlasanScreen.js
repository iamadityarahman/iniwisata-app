import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Toolbar} from "react-native-material-ui";
import Icon from "react-native-vector-icons/Ionicons";
import {detailBackAction} from "../App";
import UlasanList from "../components/UlasanList";
import StarRating from 'react-native-star-rating';
import RatingDiagram from "../components/RatingDiagram";
import {connect} from 'react-redux';
import {fetchRating} from "../redux/actions/wisataOpen";
import HeaderDaftarUlasan from "../components/HeaderDaftarUlasan";
import {iniwisata_primary_dark} from "../color";

class UlasanScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'ULASAN',
        tabBarIcon: ({tintColor}) => (
            <Icon name="md-chatbubbles" size={25} color={tintColor}/>
        )
    });

    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }
    }


    ulasanKosong() {
        return(
            <View style={styles.ulasanKosongContainer}>
                <Text style={styles.ulasanKosongText}>BELUM ADA ULASAN</Text>
            </View>
        );
    }

    async loadmore() {
        const jumlahPage = Math.ceil(this.props.ulasan.length/5);
        if (this.state.page < jumlahPage) {
            await this.setState({page: this.state.page + 1});
        }
    }

    renderFooter() {
        return (
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {
                    (this.state.page >= Math.ceil(this.props.ulasan.length/5) ? false : true) ? (
                        <TouchableOpacity
                            style={{
                                marginBottom: 10
                            }}
                            onPress={this.loadmore.bind(this)}
                        >
                            <Text
                                style={{
                                    color: iniwisata_primary_dark
                                }}
                            >
                                Lainnya...
                            </Text>
                        </TouchableOpacity>
                    ) : (<View height={10}/>)
                }

            </View>
        );
    }

    render() {
        const {ulasan, detailWisata} = this.props;
        const ulasanPerpage = ulasan.slice(0, this.state.page*5);
        return (
            <View style={styles.ulasanContainer}>
                <Toolbar
                    leftElement="arrow-back"
                    centerElement={detailWisata.nama_tempat.toUpperCase()}
                    onLeftElementPress={() => {this.props.navigation.dispatch(detailBackAction)}}
                />
                <FlatList
                    style={styles.ulasanList}
                    data={ulasanPerpage}
                    ListFooterComponent={this.renderFooter.bind(this)}
                    ListHeaderComponent={<HeaderDaftarUlasan navigation={this.props.navigation}/>}
                    ListEmptyComponent={this.ulasanKosong}
                    keyExtractor={(item) => item.email}
                    renderItem={({item}) => (
                        <UlasanList {...item} />
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ulasanContainer: {
        backgroundColor: 'white',
        flex: 1
    },
    ulasanList: {
        backgroundColor: 'white',
        paddingHorizontal: 10
    },
    ulasanKosongContainer: {
        alignItems: 'center',
        padding: 20
    },
    ulasanKosongText: {
        fontWeight: 'bold',
        fontSize: 18
    }
});

const mapStateToProps = state => ({
    ulasan: state.wisataOpen.ulasan,
    commentAble: state.wisataOpen.commentAble,
    detailWisata: state.wisataOpen.detailWisata
});

const mapDispatchToProps = dispatch => ({
    fetchRating: id_wisata => dispatch(fetchRating(id_wisata))
});

export default connect(mapStateToProps, mapDispatchToProps)(UlasanScreen);
