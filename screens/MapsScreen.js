import React from 'react';
import {View, Dimensions, StyleSheet, Text, AsyncStorage} from 'react-native';
import {Toolbar} from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/Ionicons';
import {detailBackAction} from "../App";
import MapView, {Marker} from 'react-native-maps';
import {connect} from 'react-redux';
import MapViewDirection from 'react-native-maps-directions';
import {GOOGLEMAPSKEYAPI} from "../keyToken";

const {width, height} = Dimensions.get('window');

class MapsScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'LOKASI',
        tabBarIcon: ({tintColor}) => (
            <Icon name="md-compass" size={25} color={tintColor}/>
        )
    });

    render() {
        const {detailWisata} = this.props;

        const mapLat = parseFloat(detailWisata.lat);
        const mapLng = parseFloat(detailWisata.lng);
        const marker = {latitude: mapLat, longitude: mapLng};

        return (
            <View>
                <Toolbar
                    leftElement="arrow-back"
                    centerElement={detailWisata.nama_tempat.toUpperCase()}
                    onLeftElementPress={() => {this.props.navigation.dispatch(detailBackAction)}}
                />
                <View>
                    <View style={styles.container}>
                        <MapView
                            pitchEnabled={false}
                            style={styles.map}
                            region={{
                                latitude: mapLat,
                                longitude: mapLng,
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.005,
                            }}
                        >
                            <Marker
                                coordinate={marker}
                                title={detailWisata.nama_tempat.toUpperCase()}
                            />
                        </MapView>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        width: width,
        height: height-130,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    }
});

const mapStateToProps = state => ({
    detailWisata: state.wisataOpen.detailWisata
});

export default connect(mapStateToProps)(MapsScreen);
