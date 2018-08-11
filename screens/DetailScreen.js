import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {Toolbar} from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/Ionicons';
import {detailBackAction} from "../App";
import StarRating from 'react-native-star-rating';
import {Ulasan} from "../components/UlasanList";
import MapView, {Marker} from 'react-native-maps';
import Collapsible from 'react-native-collapsible';
import RatingDiagram from "../components/RatingDiagram";
import {fetchRating, clearWisataOpen, fetchAll} from "../redux/actions/wisataOpen";
import connect from "react-redux/es/connect/connect";
import {SkypeIndicator} from 'react-native-indicators'
import {iniwisata_primary_dark} from "../color";

const hari = [
    {kecil: 'senin', eyd: 'Senin'},
    {kecil: 'selasa', eyd: 'Salasa'},
    {kecil: 'rabu', eyd: 'Rabu'},
    {kecil: 'kamis', eyd: 'Kamis'},
    {kecil: 'jumat', eyd: "Jum'at"},
    {kecil: 'sabtu', eyd: 'Sabtu'},
    {kecil: 'minggu', eyd: 'Minggu'}
];

const JadwalRow = props => (
    <View style={{
        flexDirection: 'row'
    }}>
        <View style={{
            width: 75
        }}>
            <Text>{props.value.eyd}</Text>
        </View>
        <View>
            <Text>{props.jadwal[props.value.kecil]}</Text>
        </View>
    </View>
);

class DetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCollapse: true
        };
    }

    componentWillUnmount() {
        this.props.clearWisataOpen();
    }

    static navigationOptions = ({navigation}) => ({
        title: 'RINCIAN',
        tabBarIcon: ({tintColor}) => (
            <Icon name="md-information-circle" size={25} color={tintColor}/>
        )
    });

    render() {
        const {rating, jadwal, ulasan, fasilitas, detailWisata} = this.props.wisataOpen;
        const {commentAble, isLoading} = this.props;

        if (isLoading) return (
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <SkypeIndicator
                    color={iniwisata_primary_dark}
                />
            </View>
        );

        const jumlahUlasan = ulasan.length;

        return (
            <View>
                <Toolbar
                    leftElement="arrow-back"
                    centerElement={detailWisata.nama_tempat.toUpperCase()}
                    onLeftElementPress={() => {this.props.navigation.dispatch(detailBackAction)}}
                />
                <ScrollView style={{marginBottom: 55}}>
                    <ImageBackground
                        style={{ height: 250}}
                        source={{uri: detailWisata.gambar}}
                    />

                    <View style={styles.titleContainer}>
                        <Text style={{fontSize: 22}}>{detailWisata.nama_tempat.toUpperCase()}</Text>
                        <View style={styles.titleRating}>
                            <Text>{rating.rata.toFixed(2)}</Text>
                            <View style={{paddingHorizontal: 5}}>
                                <StarRating
                                    disabled={true}
                                    rating={rating.rata}
                                    starSize={14}
                                    fullStarColor="orange"
                                    halfStarEnabled={true}
                                />
                            </View>
                            <Text>({rating.total_rata})</Text>
                        </View>
                        <Text style={{
                            color: jadwal.status ? 'green' : 'red'
                        }}>{jadwal.status ? 'Buka' : 'Tutup'}</Text>
                    </View>

                    <View style={{marginVertical: 5}}>
                        <View style={styles.alamatContainer}>
                            <View style={styles.iconContainer}>
                                <Icon name="md-pin" size={30}/>
                            </View>
                            <View style={styles.alamatText}>
                                <Text>{detailWisata.alamat}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('Maps');
                                }}
                            >
                                <MapView
                                    style={{height: 100, width: 100,}}
                                    liteMode={true}
                                    region={{
                                        latitude: parseFloat(detailWisata.lat),
                                        longitude: parseFloat(detailWisata.lng),
                                        latitudeDelta: 0.05,
                                        longitudeDelta: 0.05
                                    }}
                                >
                                    <Marker
                                        coordinate={{
                                            latitude: parseFloat(detailWisata.lat),
                                            longitude: parseFloat(detailWisata.lng)
                                        }}
                                    />
                                </MapView>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.container}>
                            <TouchableOpacity
                                onPress={() => this.setState({isCollapse: !this.state.isCollapse})}
                                style={{flexDirection: 'row'}}
                            >
                                <View style={styles.iconContainer}>
                                    <Icon name="md-time" size={30}/>
                                </View>
                                <View style={styles.jadwalText}>
                                    <Text style={{fontWeight: 'bold', marginRight: 5}}>
                                        {jadwal.status ? 'Buka' : 'Tutup'}
                                    </Text>
                                    <Text style={{marginRight: 5}}>
                                        {jadwal.sekarang}
                                    </Text>
                                    <Icon name={this.state.isCollapse ? "md-arrow-dropdown" : "md-arrow-dropup"} size={20}/>
                                </View>
                            </TouchableOpacity>
                            <Collapsible collapsed={this.state.isCollapse}>
                                <View style={{
                                    marginLeft: 60,
                                    marginBottom: 15
                                }}>
                                    {
                                        hari.map((value, index) => (
                                            <JadwalRow key={index} value={value} jadwal={jadwal}/>
                                        ))
                                    }
                                </View>
                            </Collapsible>
                        </View>

                        <View style={[styles.container, {flexDirection: 'row'}]}>
                            <View style={[styles.iconContainer, {marginRight: 10}]}>
                                <Icon name="md-cash" size={30}/>
                            </View>
                            <View style={{
                                marginVertical: 15
                            }}>
                                <Text>Rp. {detailWisata.tiket_masuk.toLocaleString()}</Text>
                            </View>
                        </View>

                        <View style={[styles.container, {flexDirection: 'row'}]}>
                            <View style={[styles.iconContainer, {marginRight: 10}]}>
                                <Icon name="md-bookmark" size={30}/>
                            </View>
                            <View style={{
                                marginVertical: 15
                            }}>
                                {
                                    fasilitas.map((val, key) => (
                                        <Text key={key}>{val}</Text>
                                    ))
                                }
                            </View>
                        </View>

                        <View style={styles.container}>
                            {
                                jumlahUlasan > 0 ? (
                                    <RincianRating
                                        id={detailWisata.id}
                                        navigation={this.props.navigation}
                                    />
                                ) : (
                                    <View style={styles.ulasanKosong}>
                                        <Text
                                            style={{
                                                fontWeight: 'bold',
                                                fontSize: 15,
                                                margin: 10
                                            }}
                                        >BELUM ADA ULASAN</Text>
                                    </View>
                                )
                            }
                        </View>

                        {
                            commentAble ? (
                                <View style={[styles.container, {padding: 20}]}>
                                    <Text style={{fontWeight: 'bold'}}>Tambah Ulasan</Text>
                                    <View style={{
                                        margin: 10,
                                        marginTop: 20
                                    }}>
                                        <StarRating
                                            selectedStar={star => {
                                                this.props.navigation.navigate({
                                                    routeName: 'TambahUlasan',
                                                    params: {
                                                        rating: star,
                                                        id_wisata: detailWisata.id,
                                                        alamat: detailWisata.alamat,
                                                        nama_wisata: detailWisata.nama_tempat
                                                    }
                                                });
                                            }}
                                        />
                                    </View>
                                </View>
                            ) : null
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const RincianRating = props => (
    <View>
        <RatingDiagram/>
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 20,
                marginBottom: 15,
                marginTop: 10
            }}
            onPress={() => props.navigation.navigate('Ulasan')}
        >
            <Icon name="md-arrow-forward" size={15}/>
            <Text style={{fontWeight: 'bold', marginLeft: 5}}>Ulasan Selangkapnya</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        elevation: 1,
        marginHorizontal: 10,
        marginVertical: 5
    },
    ulasanKosong: {
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleContainer: {
        backgroundColor: 'white',
        padding: 20
    },
    titleRating: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    alamatContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        elevation: 1,
        marginHorizontal: 10,
        marginVertical: 5,
        paddingLeft: 10
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        padding: 10
    },
    alamatText: {
        flexGrow: 1,
        width: 0,
        justifyContent: 'center',
        padding: 10
    },
    jadwalText: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10
    }
});

const mapStateToProps = state => ({
    isLoading: state.wisataOpen.isLoading,
    commentAble: state.wisataOpen.commentAble,
    wisataOpen: state.wisataOpen
});

const mapDispatchToProps = dispatch => ({
    fetchAll: id_wisata => dispatch(fetchAll(id_wisata)),
    fetchRating: id_wisata => dispatch(fetchRating(id_wisata)),
    clearWisataOpen: () => dispatch(clearWisataOpen())
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen);
