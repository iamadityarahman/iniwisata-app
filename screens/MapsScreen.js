import React from 'react';
import {View, Dimensions, StyleSheet, Text, AsyncStorage} from 'react-native';
import {Toolbar} from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/Ionicons';
import {detailBackAction} from "../App";
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const {width, height} = Dimensions.get('window');

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
    },
});

class MapsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nama_tempat: this.props.navigation.state.params.nama_tempat,

            lat: this.props.navigation.state.params.lat,
            lng: this.props.navigation.state.params.lng
        };
    }

    static navigationOptions = ({navigation}) => ({
        title: 'Peta Lokasi',
        tabBarIcon: ({tintColor}) => (
            <Icon name="md-compass" size={25} color={tintColor}/>
        )
    });

    render() {
        const mapLat = parseFloat(this.state.lat);
        const mapLng = parseFloat(this.state.lng);
        const marker = {latitude: mapLat, longitude: mapLng};

        return (
            <View>
                <Toolbar
                    leftElement="arrow-back"
                    centerElement={this.state.nama_tempat.toUpperCase()}
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
                                title={this.state.nama_tempat.toUpperCase()}
                            />
                        </MapView>
                    </View>
                </View>
            </View>
        );
    }
}

export default MapsScreen;
